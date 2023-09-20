const getPath = (
  data: any,
  depth: number,
  key: '',
  indent: number,
  index: number
): { key: string; depth: number; found: boolean; index?: number } => {
  if (depth <= 0) {
    return {
      key,
      depth: 0,
      found: false,
    };
  }

  if (typeof data !== 'object') {
    return {
      key: '',
      depth: depth - 1,
      found: false,
    };
  }

  for (const key in data) {
    // console.log(depth, key);
    if (typeof data[key] === 'object' && depth > 0) {
      // @ts-ignore
      const res = getPath(data[key], depth - 1, key, indent + 1, index);
      depth = res.depth;

      if (depth === 0) {
        if (Array.isArray(data)) {
          return {
            ...res,
            key: `[${key}].${res.key}`,
          };
        }
        if (res.key[0] === '[') {
          return {
            ...res,
            key: `${key}${res.key}`,
          };
        }
        return {
          ...res,
          key: `${key}.${res.key}`,
        };
      }
      // console.log(res, key);
    }
    --depth;

    if (depth <= 0) {
      const check = index >= indent * 2 + key.length;

      if (check) {
        return {
          key,
          depth: 0,
          found: check,
          index: index - (indent * 2 + key.length + 4) - 1,
        };
      }

      return {
        key,
        depth: 0,
        found: check,
      };
    }
  }

  return {
    key: '',
    depth,
    found: false,
  };
};

export const search = (data: any, text: string, debug: boolean = false) => {
  const dataString = JSON.stringify(data, null, 2);
  const regex = new RegExp(text, 'g');
  let match = regex.exec(dataString);
  const searchResult = [];

  if (debug) {
    console.time('search');
  }

  do {
    if (match) {
      const lines = dataString.slice(0, match.index).split('\n');
      const path = lines.length;
      const index = lines[lines.length - 1].length;

      const res = getPath(data, path - 1, '', 1, index);

      if (res.found) {
        searchResult.push({
          key: res.key,
          index: res.index,
          endIndex: (res.index || 0) + match[0].length,
        });
      }
    }

    match = regex.exec(dataString);
  } while (match);
  if (debug) {
    console.timeEnd('search');
  }
  return searchResult;
};
