# Search In Json (with unknown schema)

This is a simple tool to find the path of a key in a JSON object. You can use it to find the path of a key in a JSON object, and then use the path to get the value of the key.

**[Code SandBox Link](https://codesandbox.io/s/search-in-json-d2x8qs?file=/src/App.js)**

![logo](./screenshot.png)

## Example

```js
import { search } from 'search-in-json';
import { data } from './data';

console.log(
  search({
    data,
    text: 'order',
    debug: true,
    ignoreCamelCase: true,
  })
);

```
## Exmple2 with regex


```js
import { search } from 'search-in-json';
import { data } from './data';

console.log(
  search({
    data,
    debug: true,
    ignoreCamelCase: true,
    regex: /order/gi,
  })
);

```
