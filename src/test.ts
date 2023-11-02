import { search } from '.';
import { data } from './data';

const init = () => {
  const res = search({
    data,
    text: 'r',
    debug: true,
    ignoreCamelCase: true,
    searchIn: 'both',
    // regex: /order/gi,
  });

  console.log(res);
};

init();
