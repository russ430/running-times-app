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
    }
  }
}