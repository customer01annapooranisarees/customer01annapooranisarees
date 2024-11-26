const { timezones } = require('@annapoorani/annapoorani/src/lib/locale/timezones');

module.exports = {
  Query: {
    timezones: () => timezones
  }
};
