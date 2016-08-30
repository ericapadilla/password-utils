var _ = require('lodash');
var commonPasswords = require('./commonPasswords');
var defaults = require('./defaults');

module.exports = {
  isCommon: function(password, opts) {
    var _defaults = _.cloneDeep(defaults);

    if (opts) {
      if (_.isInteger(opts.restriction) && opts.restriction > 0
        && opts.restriction <= _defaults.restriction) {
        _defaults.restriction = opts.restriction;
      }
    }

    if (!_.isString(password)) {
      return false;
    }

    var common = false;

    _.forEach(_.slice(commonPasswords, 0, _defaults.restriction), function(value) {
      if (value === password.toLowerCase()) {
        common = true;
        return false;
      }
    });

    return common;
  }
};
