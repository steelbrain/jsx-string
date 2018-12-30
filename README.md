# JSX-String

JSX-string is a cool module that allows you to write JSX and receive strings out of it. The main benefits include writing XML as JSX.

Because React by design doesn't support colons (`:`) in attribute and tags, just write `a_b` and it'll be converted to `a:b`

## Installation

```sh
npm install --save jsx-string
```

## Types

```js

export type Options = {
  escape: boolean = false,
};
export default function jsx(input: any, options: Options);
export function h(...);
```

## Usage

```js
import jsxString from 'jsx-string'

/** @jsx jsxString.h */
// ^ tell babel to route all JSX calls to that function

const username = 'someone'
const query = jsxString(<methodCall>
  <param>{username}</param>
</methodCall>, {
  escape: false,
})
console.log(typeof query) // 'string'
```

## License

This project is licensed under the terms of MIT License, see the LICENSE file for more info
