var _ = require('lodash');
var commonPasswords = require('./commonPasswords');
var defaults = require('./defaults');

module.exports = {
  isCommon: function(password, opts) {
    var _defaults = _.cloneDeep(defaults);

    if (!_.isString(password)) {
      return false;
    }

    if (opts) {
      if (_.isInteger(opts.restriction) && opts.restriction > 0
        && opts.restriction <= _defaults.restriction) {
        _defaults.restriction = opts.restriction;
      }

      if (opts.exact === false) {
        _defaults.exact = false;
      }
    }

    var common = false;

    _.forEach(_.slice(commonPasswords, 0, _defaults.restriction), function(value) {
      password = password.toLowerCase();

      if (_defaults.exact && value === password) {
        common = true;
        return false;
      } else if (!_defaults.exact && password.indexOf(value) === 0) {
        common = true;
        return false;
      }

    });

    return common;
  }
};
