var _ = require('lodash');
var commonPasswords = require('./commonPasswords');

module.exports = {
  isCommon: function(password) {
    if (!_.isString(password)) {
      return false;
    }

    var common = false;

    _.forEach(commonPasswords, function(value) {
      if (value === password.toLowerCase()) {
        common = true;
        return false;
      }
    });

    return common;
  }
};
