/* eslint-env jest */
'use strict'

const compare = require('./')

test('should be defined', () => {
  expect(compare).toBeDefined()
  expect(typeof compare).toBe('function')
})

test('should compare two objects', () => {
  const obj1 = {
    foo: 5,
    bar: 9,
    baz: {
      goo: 6,
      foo: {
        hello: 'world'
      }
    }
  }
  const obj2 = {
    foo: 5,
    baz: {
      goo: 6
    }
  }
  const result = compare(obj1, obj2)

  expect(typeof result).toBe('object')
  expect(result).toMatchObject({ bar: 9, baz: { foo: { hello: 'world' } } })
})

test('should compare two objects', () => {
  const obj1 = {
    foo: ['bar', 'baz']
  }
  const obj2 = {
    foo: ['bar']
  }
  const result = compare(obj1, obj2)

  expect(typeof result).toBe('object')
  expect(result).toMatchObject({ foo: ['baz'] })
})

const implementations = {
  source: require('./index.js'),
  package: compare
}

Object.keys(implementations).forEach(name => {
  describe(name, () => {
    const compare = implementations[name]
    const falsyValues = [false, 0, '', null, undefined]

    falsyValues.forEach((value, index) => {
      test(`omits equal falsy value ${index}`, () => {
        expect(Object.getOwnPropertyNames(compare({ value }, { value }))).toEqual([])
      })

      test(`omits nested equal falsy value ${index}`, () => {
        expect(Object.getOwnPropertyNames(compare({ nested: { value } }, { nested: { value } }))).toEqual([])
      })

      test(`retains missing falsy value ${index}`, () => {
        const result = compare({ value }, {})
        expect(Object.getOwnPropertyNames(result)).toEqual(['value'])
        expect(result.value).toBe(value)
      })

      test(`recognizes inherited equal falsy value ${index}`, () => {
        expect(Object.getOwnPropertyNames(compare({ value }, Object.create({ value })))).toEqual([])
      })

      test(`recognizes null-prototype equal falsy value ${index}`, () => {
        const other = Object.create(null)
        other.value = value
        expect(Object.getOwnPropertyNames(compare({ value }, other))).toEqual([])
      })
    })

    test('does not call a shadowed hasOwnProperty method', () => {
      const other = { value: undefined, hasOwnProperty: () => { throw new Error('not callable') } }
      expect(Object.getOwnPropertyNames(compare({ value: undefined }, other))).toEqual([])
    })

    test('preserves differing falsy and truthy scalar behavior', () => {
      expect(compare({ value: false }, { value: 0 })).toEqual({ value: false })
      expect(compare({ value: 1 }, { value: 0 })).toEqual({ value: 1 })
      expect(compare({ value: 1 }, { value: 2 })).toEqual({})
      const result = compare({ value: NaN }, { value: NaN })
      expect(Object.getOwnPropertyNames(result)).toEqual(['value'])
      expect(Number.isNaN(result.value)).toBe(true)
    })

    test('treats signed zeros as equal falsy values', () => {
      expect(compare({ value: -0 }, { value: 0 })).toEqual({})
    })

    test('preserves base-only traversal and inherited base keys', () => {
      expect(compare({}, { value: false })).toEqual({})
      expect(compare(Object.create({ value: 7 }), {})).toEqual({ value: 7 })
      expect(compare({ value: 7 }, Object.create({ value: 9 }))).toEqual({})
      expect(compare({ same: 'x', missing: 0 }, { same: 'x' })).toEqual({ missing: 0 })
    })

    test('preserves nested missing undefined against truthy scalar receivers', () => {
      const result = compare({ nested: { value: undefined } }, { nested: 1 })
      expect(Object.getOwnPropertyNames(result)).toEqual(['nested'])
      expect(Object.getOwnPropertyNames(result.nested)).toEqual(['value'])
      expect(result.nested.value).toBe(undefined)
    })

    test('recognizes existing equal falsy properties on boxed receivers', () => {
      expect(compare({ nested: { length: 0 } }, { nested: Object('') })).toEqual({})
    })

    test('preserves full objects against falsy containers', () => {
      falsyValues.forEach(value => {
        const nested = { value: false }
        const result = compare({ nested }, { nested: value })
        expect(result.nested).toBe(nested)
      })
    })

    test('preserves array differences and empty-array representation', () => {
      expect(compare({ value: ['one', 'two'] }, { value: ['two', 'three'] })).toEqual({ value: ['one', 'three'] })
      expect(compare({ value: [] }, { value: [] })).toEqual({ value: [] })
      expect(compare({ value: ['one'] }, { value: ['one'] })).toEqual({ value: [] })
      expect(compare({ value: [] }, { value: undefined })).toEqual({ value: [] })
      expect(() => compare({ value: [] }, { value: null })).toThrow()
    })

    test('preserves the README example', () => {
      const base = { name: 'foo', contactNumber: '0000000', contactIds: ['one', 'two', 'three'] }
      const other = { name: 'foo', contactIds: ['one', 'two'] }
      expect(compare(base, other)).toEqual({ contactNumber: '0000000', contactIds: ['three'] })
    })

    test('preserves value getter reads', () => {
      ;[false, 1].forEach(otherValue => {
        let baseReads = 0
        let otherReads = 0
        const base = { get value () { baseReads++; return false } }
        const other = { get value () { otherReads++; return otherValue } }
        compare(base, other)
        expect(baseReads).toBe(otherValue ? 2 : 3)
        expect(otherReads).toBe(1)
      })
    })

    test('uses the captured final values without extra getter reads', () => {
      let baseReads = 0
      let otherReads = 0
      const base = { get value () { baseReads++; return baseReads === 3 ? 0 : false } }
      const other = { get value () { otherReads++; return 0 } }
      expect(compare(base, other)).toEqual({})
      expect(baseReads).toBe(3)
      expect(otherReads).toBe(1)
    })

    test('preserves callable values and argument validation', () => {
      const value = () => false
      expect(compare({ value }, {})).toEqual({ value })
      expect(compare({ value }, { value })).toEqual({})
      expect(compare()).toEqual({})
      ;[null, false, 0, '', 1, value].forEach(invalid => {
        expect(() => compare(invalid, {})).toThrow(/Argument is not object/)
        expect(() => compare({}, invalid)).toThrow(/Argument is not object/)
      })
    })
  })
})

// Keep the established CommonJS bundle's downlevel array behavior.
test('package keeps Array subclasses in array differences', () => {
  class Values extends Array {}
  const result = compare({ value: new Values(1, 2) }, { value: new Values(2, 3) })
  expect(result.value instanceof Values).toBe(true)
  expect(Array.from(result.value)).toEqual([1, 3])
})

test('package preserves custom concat and array getter ordering', () => {
  const calls = []
  const a = [1]
  const b = [2]
  Object.defineProperty(a, 'filter', {
    value: function (fn) {
      calls.push('a.filter')
      const result = Array.prototype.filter.call(this, fn)
      Object.defineProperty(result, 'concat', {
        get: function () {
          calls.push('concat lookup')
          return function () {
            calls.push('concat call')
            return ['custom']
          }
        }
      })
      return result
    }
  })
  Object.defineProperty(b, 'filter', {
    value: function (fn) {
      calls.push('b.filter')
      return Array.prototype.filter.call(this, fn)
    }
  })
  expect(compare({ value: a }, { value: b })).toEqual({ value: ['custom'] })
  expect(calls).toEqual(['a.filter', 'concat lookup', 'b.filter', 'concat call'])
})

test('package preserves the exported function arity', () => {
  expect(compare.length).toBe(2)
})
