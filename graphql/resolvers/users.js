const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { SECRET } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, SECRET, { expiresIn: '1h' });
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if(!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ username });

      if(!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
    async register(_, { registerInput: { username, email, password, confirmPassword }}) {
      // Validate user data (make sure we don't have empty fields (password, email), passwords match)
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if(!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
}