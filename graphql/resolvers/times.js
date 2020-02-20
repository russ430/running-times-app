const { AuthenticationError } = require('apollo-server');
const checkAuth = require('../../util/checkAuth');

const Time = require('../../models/Time');
const User = require('../../models/User');

const addTimes = (oldTime, newTime) => {
  const splitNewTime = newTime.split(':');
  // converting minutes to seconds and adding to seconds
  const totalNewSeconds = (parseFloat(splitNewTime[0]) * 60) + parseFloat(splitNewTime[1]);
  // adding new total seconds to old total seconds
  const totalSeconds = parseFloat(oldTime) + totalNewSeconds;

  return totalSeconds
}

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
      const { username } = user;

      if (time.trim() === '' || miles.trim() === '') {
        throw new Error('Time and Mileage must not be empty')
      }
      
      // finding the user
      const updateUser = await User.findOne({ username });

      // grabbing the current total mileage
      const oldMiles = updateUser.runStats[0].totalMiles;
      // converting strings to floats and adding the old mileage to the new mileage
      const newMiles = parseFloat(oldMiles) + parseFloat(miles);

      // grabbing the current total time
      const oldTotalTime = updateUser.runStats[0].totalTime;
      const newTotal = addTimes(oldTotalTime, time);

      // updating the updated data
      User.findOneAndUpdate({ username: username }, { $set: { runStats: { totalMiles: newMiles, totalTime: newTotal }}}, { returnOriginal: false }, (err, doc) => {
        if (err) {
          console.log('something went wrong');
        }
        console.log(doc);
      });

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
    },
    async deleteTime(_, { timeId }, context) {
      const user = checkAuth(context);

      try {
        const time = await Time.findById(timeId);
        if(user.username === time.username) {
          await time.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch(err) {
        throw new Error(err);
      }
    }
  }
}