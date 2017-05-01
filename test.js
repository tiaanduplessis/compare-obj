/* eslint-env jest */
'use strict'

const compareObj = require('./')

test('should be defined', () => {
  expect(compareObj).toBeDefined()
  expect(typeof compareObj).toBe('function')
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
  const result = compareObj(obj1, obj2)

  expect(typeof result).toBe('object')
  expect(result).toMatchObject({ bar: 9, baz: { foo: { hello: 'world' } } })
})
