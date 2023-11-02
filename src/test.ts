import { search } from '.';
import { data } from './data';

const init = () => {
  const res = search({
    data,
    text: 'r',
    debug: true,
    ignoreCamelCase: true,
    searchIn: 'values',
    // regex: /order/gi,
  });

  console.log(res);
};

init();
