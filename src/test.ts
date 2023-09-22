import { search } from '.';
import { data } from './data';

console.log(
  search({
    data,
    text: 'order',
    debug: true,
    ignoreCamelCase: true,
    // regex: /order/gi,
  })
);
