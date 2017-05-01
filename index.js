'use strict'

/**
 * Check if argument is object
 * @param {Object} object to check if object
 */
function isObj (object) {
  return object && typeof object === 'object'
}

/**
 * Compare to objects on a property bases
 * @param {Object} base object for compare
 * @param {*} other
 */
function compare (base, other) {
  let diff = {}
  for (let prop in base) {
    if (isObj(base[prop]) && other[prop]) {
      const result = compare(base[prop], other[prop])
      if (Object.getOwnPropertyNames(result).length) {
        diff[prop] = result
      }
    }

    if (!other[prop]) {
      diff[prop] = base[prop]
    }
  }

  return diff
}

module.exports = function (base = {}, other = {}) {
  if (!isObj(base) || !isObj(other)) {
    throw new Error('Argument is not object')
  }

  return compare(base, other)
}
