const { UserInputError } = require('apollo-server');
const checkAuth = require('../../util/checkAuth');

const Time = require('../../models/Time');

module.exports = {
  Query: {
    async getTimes() {
      try {
        const times = await Time.find().sort({ createdAt: -1 });
        return times;
      } catch(err) {
        throw new Error(err);
      }
    },
    async getTime(_, { timeId }) {
      try {
        const time = await Time.findById(timeId);
        if(time){
          return time;
        } else {
          throw new Error('Time not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async postTime(_, { time, miles, body }, context) {
      const user = checkAuth(context);
      console.log(user);

      if (time.trim() === '' || miles.trim() === '') {
        throw new Error('Time and miles must not be empty')
      }
      
      const newTime = new Time({
        username: user.username,
        user: user.id,
        time,
        miles,
        body,
        createdAt: new Date().toISOString()
      });

      const postTime = await newTime.save();

      return postTime;
    }
  }
}