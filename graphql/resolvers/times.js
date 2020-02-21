const { AuthenticationError } = require('apollo-server');
const checkAuth = require('../../util/checkAuth');

const Time = require('../../models/Time');
const User = require('../../models/User');

const toSeconds = (time) => {
  const splitNewTime = time.split(':');
  // converting minutes to seconds and adding to seconds
  const totalNewSeconds = (parseFloat(splitNewTime[0]) * 60) + parseFloat(splitNewTime[1]);
  return totalNewSeconds
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

      const foundUser = await User.findOne({ username });

      //TODO: put the mile updates in its own resolver?

      //----UPDATING TOTAL MILEAGE ----//
      // grabbing the current total mileage
      const oldMiles = foundUser.runStats[0].totalMiles;
      // converting strings to floats and adding the old total to the new total
      const newTotalMiles = parseFloat(oldMiles) + parseFloat(miles);

      //---- UPDATING TOTAL TIME ----//
      // grabbing the current total time
      const oldTotalTime = foundUser.runStats[0].totalTime;
      const postSeconds = toSeconds(time);
      const newTotalSeconds = oldTotalTime + postSeconds;

      //---- UPDATING AVG MILE ----//
      // calculating average mile
      const newAvgMile = (newTotalSeconds/newTotalMiles)

      //---- UPDATING LONGEST RUN ----//
      const updatedLongestTime = () => {
        // converting new time to seconds
        const newTime = toSeconds(time);
        // if the user has a longest time
        if(foundUser.runStats[0].longestRunTime) {
          // check if the new time is longer than the current longest time
          if(newTime > foundUser.runStats[0].longestRunTime) {
            // if it is, return the new time
            return newTime;
          } else {
            // otherwise kee the old time
            return foundUser.runStats[0].longestRunTime;
          }
        // if the user doesn't have a new longest time, use the new time
        } else {
          return newTime
        }
      }

      //---- UPDATING LONGEST MILEAGE ----//
      const updatedLongestRunMiles = () => {
        if(miles > foundUser.runStats[0].longestRunMiles) {
          return miles;
        } else {
          return foundUser.runStats[0].longestRunMiles;
        }
      };

      //---- CALCULATING QUICKEST PACE ----//
      const oldPace = foundUser.runStats[0].quickestPace;
      const newPace = toSeconds(time);
      const fastestPace = () => {
        if (newPace < oldPace || oldPace === '0') {
          return newPace;
        } else {
          return oldPace;
        }
      };

      //---- UPDATING USER DATA ----//
      User.findOneAndUpdate({ username: username }, { 
        $set: { runStats: { 
          totalMiles: newTotalMiles, 
          totalTime: newTotalSeconds, 
          avgMile: newAvgMile, 
          longestRunTime: updatedLongestTime(),
          longestRunMiles: updatedLongestRunMiles(),
          quickestPace: fastestPace()
        }}}, 
        { returnOriginal: false }, (err, doc) => {
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