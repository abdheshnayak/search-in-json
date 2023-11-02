interface Map {
  [key: string]: string | number | boolean | Map | Array<any> | null;
}

export interface SearchResult {
  key: string;
  index: number;
  endIndex: number;
}

type ISResult<WantMap> = WantMap extends true
  ? {
      [key: string]: SearchResult;
    }
  : Array<SearchResult>;

export interface ISearch<A> {
  data: Map;
  text?: string;
  ignoreCamelCase?: boolean;
  debug?: boolean;
  regex?: RegExp;
  searchIn?: 'keys' | 'values' | 'both';
  withMapResult?: A;
}

export interface SearchResultItem {
  key: string;
  index?: number;
  endIndex: number;
}

export interface ISearchResult<A> {
  result: ISResult<A>;
  error?: Error;
}

interface IGetPath {
  data: any;
  depth: number;
  key: string;
  indent: number;
  cursorIndex: number;
  searchIn: 'values' | 'keys' | 'both';
}

const getPath = ({
  data,
  depth,
  key,
  indent,
  cursorIndex,
  searchIn,
}: IGetPath): {
  key: string;
  depth: number;
  found: boolean;
  index?: number;
  foundIn?: 'values' | 'keys';
} => {
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
    if (Array.isArray(data[key]) && data[key].length === 0) {
      --depth;
      continue;
    } else if (
      data[key] == null ||
      (typeof data[key] === 'object' && Object.keys(data[key]).length === 0)
    ) {
      --depth;
      continue;
    }
    if (typeof data[key] === 'object' && depth > 0) {
      const res = getPath({
        data: data[key],
        depth: depth - 1,
        key,
        indent: indent + 1,
        cursorIndex,
        searchIn,
      });
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
      const check = cursorIndex >= indent * 2 + key.length + 2;

      if (searchIn === 'values' && check) {
        return {
          key,
          depth: 0,
          found: true,
          foundIn: 'values',
          index:
            cursorIndex -
            (indent * 2 + key.length + 4) -
            (() => {
              if (
                typeof data[key] === 'number' ||
                typeof data[key] === 'boolean'
              ) {
                return 0;
              }

              return 1;
            })(),
        };
      }

      if (searchIn === 'keys' && !check) {
        return {
          key,
          depth: 0,
          found: true,
          foundIn: 'keys',
          index: cursorIndex - (indent * 2 + 1),
        };
      }

      if (searchIn === 'both') {
        if (check) {
          return {
            key,
            depth: 0,
            found: true,
            index:
              cursorIndex -
              (indent * 2 + key.length + 4) -
              (() => {
                if (
                  typeof data[key] === 'number' ||
                  typeof data[key] === 'boolean'
                ) {
                  return 0;
                }

                return 1;
              })(),
            foundIn: 'values',
          };
        }

        // should never reach
        return {
          key,
          depth: 0,
          found: true,
          index: cursorIndex - (indent * 2 + 1),
          foundIn: 'keys',
        };
      }

      return {
        key,
        depth: 0,
        found: false,
      };
      // here
    }
  }

  return {
    key: '',
    depth,
    found: false,
  };
};

export const search = <A extends boolean | undefined = undefined>({
  data,
  text,
  debug = false,
  ignoreCamelCase = false,
  regex,
  searchIn = 'values',
  withMapResult,
}: ISearch<A>): ISearchResult<A> => {
  const dataString = JSON.stringify(data, null, 2);

  if (text) {
    regex = new RegExp(text, ignoreCamelCase ? 'gi' : 'g');
  }

  if (!regex) {
    return {
      result: (withMapResult ? {} : []) as ISearchResult<A>['result'],
      error: new Error('No regex provided'),
    };
  }

  let match = regex.exec(dataString);
  const resultMap: {
    [key: string]: SearchResultItem;
  } = {};

  if (debug) {
    console.time('search');
  }

  do {
    if (match) {
      const lines = dataString.slice(0, match.index).split('\n');
      const path = lines.length;
      const index = lines[lines.length - 1].length;

      const res = getPath({
        data,
        depth: path - 1,
        key: '',
        indent: 1,
        cursorIndex: index,
        searchIn,
      });

      if (res.found) {
        resultMap[res.key] = {
          key: res.key,
          index: res.index || 0,
          endIndex: (res.index || 0) + match[0].length,
        };
      }
    }

    match = regex.exec(dataString);
  } while (match);
  if (debug) {
    console.timeEnd('search');
  }

  if (withMapResult) {
    return {
      result: resultMap as ISearchResult<A>['result'],
    };
  }

  return {
    result: Object.values(resultMap) as ISearchResult<A>['result'],
  };
};
