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
      totalTime: String,
      longestRunTime: String,
      longestRunMiles: String
    }
  ]
});

module.exports = model('User', userSchema);