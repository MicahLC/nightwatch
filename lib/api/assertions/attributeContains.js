/**
 * Checks if the given attribute of an element contains the expected value.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.attributeContains('#someElement', 'href', 'google.com');
 *    };
 * ```
 *
 * @method attributeContains
 * @param {string|object} selector The selector (CSS/Xpath) used to locate the element. Can either be a string or an object which specifies [element properties](https://nightwatchjs.org/guide#element-properties).
 * @param {string} attribute The attribute name
 * @param {string} expected The expected contained value of the attribute to check.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

const util = require('util');

exports.assertion = function(definition, attribute, expected, msg) {
  const DEFAULT_MSG = 'Testing if attribute %s of <%s> contains "%s".';
  const MSG_ELEMENT_NOT_FOUND = `${DEFAULT_MSG} Element could not be located.`;
  const MSG_ATTR_NOT_FOUND = `${DEFAULT_MSG} Element does not have a ${attribute} attribute.`;

  this.message = msg || util.format(DEFAULT_MSG, attribute, this.elementSelector, expected);

  this.expected = function() {
    return expected;
  };

  this.pass = function(value) {
    return value.indexOf(expected) > -1;
  };

  this.failure = function(result) {
    let failed = (result === false) ||
      // no such element
      result && (result.status === -1 || result.value === null);

    if (failed) {
      let defaultMsg = MSG_ELEMENT_NOT_FOUND;
      if (result && result.value === null) {
        defaultMsg = MSG_ATTR_NOT_FOUND;
      }
      this.message = msg || util.format(defaultMsg, attribute, this.elementSelector, expected);
    }

    return failed;
  };

  this.value = function(result) {
    return result.value;
  };

  this.command = function(callback) {
    return this.api.getAttribute(definition, attribute, callback);
  };

};
