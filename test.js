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
