import { search } from '../dist';
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
