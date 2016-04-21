# JSX-String

JSX-string is a cool module that allows you to write JSX and receive strings out of it. The main benefits include writing XML as JSX.

## Installation

```sh
npm install --save jsx-string
```

## Usage

```js
import jsxString from 'jsx-string'

/** @jsx jsxString */
// ^ tell babel to route all JSX calls to that function

const username = 'someone'
const query = <methodCall>
  <param>{username}</param>
</methodCall>
console.log(typeof query) // 'string'
```

## License

This project is licensed under the terms of MIT License, see the LICENSE file for more info
