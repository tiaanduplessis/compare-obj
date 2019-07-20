const isObj = val => val && typeof val === 'object'
const isArr = arr => Array.isArray(arr)

const arrMerge = (a = [], b = []) => {
  return [
    ...a.filter(x => !b.includes(x)),
    ...b.filter(x => !a.includes(x))
  ]
}

/**
 * Compare to objects on a property bases
 * @param {Object} base object for compare
 * @param {*} other
 */
function compare (base, other) {
  const diff = {}
  for (const prop in base) {
    // Both objects have the prop and both are objects
    if (isObj(base[prop]) && other[prop]) {
      const result = compare(base[prop], other[prop])
      if (Object.getOwnPropertyNames(result).length) {
        diff[prop] = result
      }
    }

    // Prop is array
    if (isArr(base[prop])) {
      diff[prop] = arrMerge(base[prop], other[prop])
    }

    // Prop in base
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
