import { MatchIterator } from './interfaces';

export const matchesIterator = (
  matches: IterableIterator<RegExpMatchArray>,
  dataString: string
): MatchIterator => {
  const matchesArray = [...matches].map((value) => {
    const _lines = dataString.slice(0, value.index).split('\n');
    const _depth = _lines.length - 1;
    const _cursorIndex = _lines[_lines.length - 1].length;
    return {
      match: value[0],
      depth: _depth,
      cursorIndex: _cursorIndex,
      index: value.index,
    };
  });
  let index = -1;

  return {
    getAll: () => matchesArray,
    length: matchesArray.length,
    next: () => {
      ++index;
      const value = matchesArray[index];
      return {
        value,
        done: index > matchesArray.length,
      };
    },
    current: () => {
      return {
        value: matchesArray[index],
      };
    },
    prev: () => {
      --index;
      return {
        value: matchesArray[index],
        done: index < 0,
      };
    },
  };
};
