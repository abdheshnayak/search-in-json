import { search } from '../src';
import { data } from './data';

const init = () => {
  const res = search({
    data,
    text: 'US',
    debug: true,
    ignoreCamelCase: true,
    searchIn: 'values',
    // regex: /order/gi,
  });

  console.log(res);
};

init();
