import { IGetPath, ISearchInfoResult, SearchResultItem } from './interfaces';
import { newLogger } from './logger';

export const getPath = ({
  data,
  searchInfo,
  searchIn,
  matches,
  dataString,
  result,
  debug,
}: IGetPath): {
  searchInfo: ISearchInfoResult;
  result: {
    [key: string]: SearchResultItem;
  };
} => {
  const logger = newLogger(debug);
  if (!searchInfo) {
    const match = matches.next();
    if (match.value) {
      const { depth } = match.value;

      searchInfo = {
        key: '',
        depth,
        indent: 1,
      };

      const res = getPath({
        debug,
        data,
        dataString,
        searchInfo,
        searchIn,
        matches,
        result,
      });
      return res;
    }

    return {
      searchInfo: {
        depth: 0,
        found: false,
      },
      result,
    };
  }

  const { key: pathKey, indent } = searchInfo;
  let { depth } = searchInfo;

  if (depth <= 0) {
    return {
      result,
      searchInfo: {
        depth: 0,
        found: false,
      },
    };
  }

  if (typeof data !== 'object') {
    return {
      searchInfo: {
        depth: depth - 1,
        found: false,
      },
      result,
    };
  }

  logger.log(depth, ':', pathKey, indent);
  for (var i = 0; i < Object.keys(data).length; i++) {
    const key = Object.keys(data)[i];
    if (Array.isArray(data[key]) && data[key].length === 0) {
      --depth;
      continue;
    } else if (
      typeof data[key] === 'object' &&
      Object.keys(data[key]).length === 0
    ) {
      --depth;
      continue;
    }

    if (typeof data[key] === 'object' && depth > 0) {
      const res = getPath({
        debug,
        dataString,
        matches,
        data: data[key],
        searchInfo: {
          depth: depth - 1,
          key: `${pathKey ? `${pathKey}.` : ''}${key}`,
          indent: indent + 1,
        },
        result,
        searchIn,
      });

      if (res.searchInfo.found) {
        const si = res.searchInfo;
        const foundPath = (() => {
          logger.log('searchIn res: ', pathKey);
          if (typeof data === 'object') {
            if (Array.isArray(data)) {
              return `${pathKey}[${key}].${si.key}`;
            }
            return `${pathKey}.${key}.${si.key}`;
          }

          return `${pathKey}${key}${si.key}`;
        })();
        logger.log('found path: ---------->', foundPath);

        result[foundPath] = {
          key: foundPath,
          index: si.index,
          endIndex: si.index + matches.current().value.match.length,
          foundIn: res.searchInfo.foundIn,
        };

        const oldMatch = matches.current();
        const match = matches.next();
        if (match.value) {
          const _depth = match.value.depth;
          const _cursorIndex = match.value.cursorIndex;

          logger.log(
            `searching next: --------------->${_depth},${oldMatch.value.depth}, cursor: ${_cursorIndex} ${depth}`
          );

          depth = _depth - oldMatch.value.depth + depth;
          i -= 1;
          continue;
        } else {
          return {
            result,
            searchInfo: {
              found: false,
              depth: 0,
            },
          };
        }

        // return {
        //   result,
        //   searchInfo: {
        //     found: false,
        //     depth: depth - 1,
        //   },
        // };
      } else {
        depth = res.searchInfo.depth;
      }
    }

    --depth;

    if (depth < 0) {
      return {
        result,
        searchInfo: {
          found: false,
          depth: 0,
        },
      };
    }

    logger.log(depth, ':', `${pathKey}.${key}`, indent);
    if (depth <= 0) {
      const check =
        matches.current().value.cursorIndex >= indent * 2 + key.length + 4 - 1;

      const getIndex = (
        ci: number
      ): {
        index: number;
        foundIn: 'keys' | 'values';
      } => {
        if (searchIn === 'values' && check) {
          return {
            index: ci - (indent * 2 + key.length + 4) - 1,
            foundIn: 'values',
          };
        }

        if (searchIn === 'keys' && !check) {
          return {
            index: ci - (indent * 2 + 1),
            foundIn: 'keys',
          };
        }

        if (searchIn === 'both') {
          if (check) {
            return {
              index: ci - (indent * 2 + key.length + 4) - 1,
              foundIn: 'values',
            };
          }

          return {
            index: ci - (indent * 2 + 1),
            foundIn: 'keys',
          };
        }

        return {
          index: -1,
          foundIn: 'keys',
        };
      };

      const r = getIndex(matches.current().value.cursorIndex);

      if (r.index < 0) {
        return {
          result,
          searchInfo: {
            found: false,
            depth: 0,
          },
        };
      }

      return {
        result,
        searchInfo: {
          foundIn: r.foundIn,
          index: r.index,
          found: true,
          key,
        },
      };
    }
  }

  return {
    result,
    searchInfo: {
      depth,
      found: false,
    },
  };
};
