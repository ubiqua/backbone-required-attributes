(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'exports'], factory);
  } else if (typeof exports === 'object') {
    factory(require('underscore'), require('backbone'), exports);
  } else {
    factory(_, Backbone, {});
  }
}(function (_, Backbone, RequiredAttributes) {

  'use strict';

  // RequiredAttributes Plugin Namespace

  // Export onto Backbone object
  Backbone.RequiredAttributes = RequiredAttributes;

  // Backbone.View Mixin
  RequiredAttributes.ViewMixin = {

    // Validates if the plugin and its options have been properly
    // set up to later delegate call to validator helper
    // @param {object} Values to be tested against the desired rules
    // @return {void}
    // @method validateAttrs
    validateAttrs: function(values) {
      var rules = this.requiredAttrs;
      if(_.isUndefined(rules) || _.isNull(rules)) {
        console.warn('"requiredAttrs" must be declared.');
      } else if (Object.getOwnPropertyNames(rules).length === 0) {
        console.warn('"requiredAttrs" cannot be empty.');
      } else  if (_.isUndefined(values) || _.isNull(values) ||
                  Object.getOwnPropertyNames(values).length === 0) {
        console.warn('No values were pass to "validateAttrs".');
      } else {
        for (var ruleProp in rules) {
          if (rules.hasOwnProperty(ruleProp)) {
            ValidatorHelper.validate(
              rules[ruleProp],
              values[ruleProp],
              ruleProp
            );
          }
        }
      }
    }

  };

  // Extend Backbone View
  _.extend(Backbone.View.prototype, RequiredAttributes.ViewMixin);

  // Validator helper
  var ValidatorHelper = {

    // Prefixer to name functions and avoid
    // using reserved words
    pre: '_',

    // Validates a value against a rule if it exists. Logs error
    // message if value does not comply to rule or rule does
    // not exist
    // @param {variant} Rule to be used against value
    // @param {variant} The actual value to be tested against
    // @param {string} The property which has the desired value
    // @return {void}
    // @method validate
    validate: function(rule, value, property) {
      try {
        if (_.isString(rule) && _.isFunction(this[this.pre + rule])) {
          this[this.pre + rule](rule, value, property);
        } else if (_.isFunction(rule)) {
          this._instanceOf(rule, value, property);
        } else {
          throw '"' +  rule + '" rule does not exist.';
        }
      } catch(err) {
        console.error(err);
      }
    },

    // Validates if the property's value is a string
    // @param {variant} Rule to be used against value
    // @param {variant} The actual value to be tested against
    // @param {string} The property which has the desired value
    // @return {void}
    // @method _string
    _string: function(rule, value, property) {
      if(!_.isString(value)) {
        this._throwError(rule, property);
      }
    },

    // Validates if the property's value is a boolean
    // @param {variant} Rule to be used against value
    // @param {variant} The actual value to be tested against
    // @param {string} The property which has the desired value
    // @return {void}
    // @method _boolean
    _boolean: function(rule, value, property) {
      if(!_.isBoolean(value)) {
        this._throwError(rule, property);
      }
    },

    // Validates if the property's value is an array
    // @param {variant} Rule to be used against value
    // @param {variant} The actual value to be tested against
    // @param {string} The property which has the desired value
    // @return {void}
    // @method _array
    _array: function(rule, value, property) {
      if(!_.isArray(value)) {
        this._throwError(rule, property);
      }
    },

    // Validates if the property's value is a number
    // @param {variant} Rule to be used against value
    // @param {variant} The actual value to be tested against
    // @param {string} The property which has the desired value
    // @return {void}
    // @method _number
    _number: function(rule, value, property) {
      if(!_.isNumber(value)) {
        this._throwError(rule, property);
      }
    },

    // Validates if the property's value has in its prototype
    // chain the prototype property of the constructor. Throws
    // exception if value does not comply to rule
    // @param {variant} Rule to be used against value
    // @param {variant} The actual value to be tested against
    // @param {string} The property which has the desired value
    // @return {void}
    // @method _instanceOf
    _instanceOf: function(rule, value, property) {
      if(!(value instanceof rule)) {
        throw '"' + property + '" doesn\'t have the correct constructor.';
      }
    },

    // Throws exception of a particular rule with the
    // specified property
    // @param {variant} Rule which was broken
    // @param {string} The property which didn't follow the rule
    // @return {void}
    // @method _throwError
    _throwError: function(rule, property) {
      throw '"' + property + '" must be of type "' + rule + '".';
    }

  };

  return RequiredAttributes;

}));