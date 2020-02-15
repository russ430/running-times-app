const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../../config');
const User = require('../../models/User');

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword }}) {
      // Validate user data (make sure we don't have empty fields (password, email), passwords match)
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

      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, SECRET, { expiresIn: '1h' });

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
}