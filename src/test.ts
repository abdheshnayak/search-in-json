import { search } from '.';
import { data } from './data';

const init = async () => {
  const res = await search({
    data,
    text: 'r',
    debug: true,
    ignoreCamelCase: true,
    searchIn: 'keys',
    // regex: /order/gi,
  });

  // console.log(res);
  console.log(res.result.length);
};

// (?<="[^"]*)([^"]216)(?=[^"]*")
// (?<=".*)((unday)(?=.*(": "))|(?<=(": ").*)(unday)|())(?=.*")

init();
