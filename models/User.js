const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  createdAt: String,
  runStats: [
    {
      totalMiles: String,
      totalTime: String
      // avgMile: String,
      // fastestMile: String,
      // longestTime: String,
      // longestMiles: String
    }
  ]
});

module.exports = model('User', userSchema);