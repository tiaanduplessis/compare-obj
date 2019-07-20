
# compare-obj
[![package version](https://img.shields.io/npm/v/compare-obj.svg?style=flat-square)](https://npmjs.org/package/compare-obj)
[![package downloads](https://img.shields.io/npm/dm/compare-obj.svg?style=flat-square)](https://npmjs.org/package/compare-obj)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/compare-obj.svg?style=flat-square)](https://npmjs.org/package/compare-obj)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Recursively compare 2 objects on a property bases to get the difference

## Table of Contents

- [About](#about)
- [Features](#features)
- [Usage](#usage)
- [Install](#install)
- [Contribute](#contribute)
- [License](#License)

## About

Explain the problem the package is trying to solve.

## Features

- Name key features e.g. size, performance, how it differs from similar solutions etc.

## Usage

```js
const compare = require('compare-obj')

const data = {
  id: 'foobarbaz',
  name: 'Bazzy',
  contactNumber: '0000000',
  contactIds: ['one', 'two', 'three']
}

const initialValues = {
  id: 'foobarbaz',
  name: 'Bazzy',
  contactIds: ['one', 'two']
}

console.log(compare(data, initialValues))
// { contactNumber: '0000000', contactIds: [ 'three' ] }

```


## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com).

```sh
$ npm install compare-obj
$ # OR
$ yarn add compare-obj
```

## Contribute

1. Fork it and create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -am "Add some feature"`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request

## License

MIT
