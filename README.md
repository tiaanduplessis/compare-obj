<h1 align="center">compare-obj</h1>
<div align="center">
  <strong>Recursively compare 2 objects on a property bases to get the difference</strong>
</div>
<br>
<div align="center">
  <a href="https://npmjs.org/package/compare-obj">
    <img src="https://img.shields.io/npm/v/compare-obj.svg?style=flat-square" alt="Package version" />
  </a>
  <a href="https://npmjs.org/package/compare-obj">
  <img src="https://img.shields.io/npm/dm/compare-obj.svg?style=flat-square" alt="Downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/compare-obj">
    <img src="https://img.shields.io/travis/tiaanduplessis/compare-obj.svg?style=flat-square" alt="Travis Build" />
  </a>
  <a href="https://github.com/RichardLitt/standard-readme)">
    <img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" alt="Standard Readme" />
  </a>
  <a href="https://badge.fury.io/gh/tiaanduplessis%2Fcompare-obj">
    <img src="https://badge.fury.io/gh/tiaanduplessis%2Fcompare-obj.svg?style=flat-square" alt="GitHub version" />
  </a>
  <a href="https://dependencyci.com/github/tiaanduplessis/compare-obj">
    <img src="https://dependencyci.com/github/tiaanduplessis/compare-obj/badge?style=flat-square" alt="Dependency CI" />
  </a>
  <a href="https://github.com/tiaanduplessis/compare-obj/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/compare-obj.svg?style=flat-square" alt="License" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs" />
  </a>
  <a href="https://www.paypal.me/tiaanduplessis/1">
    <img src="https://img.shields.io/badge/$-support-green.svg?style=flat-square" alt="Donate" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/compare-obj/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/compare-obj.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/compare-obj/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/compare-obj.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20compare-obj!%20https://github.com/tiaanduplessis/compare-obj%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/compare-obj.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="tiaan.beer">Tiaan</a> and <a href="https://github.com/tiaanduplessis/compare-obj/graphs/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#about">About</a></li>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>


## Install

```sh
$ npm install --save compare-obj
# OR
$ yarn add compare-obj
```

## Usage

```js
const compareObj = require('compare-obj')

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

console.log(compareObj(obj1, obj2))
// ​​​​​{ bar: 9, baz: { foo: { hello: 'world' } } }​​​​​

```

## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

Note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Licensed under the MIT License.
