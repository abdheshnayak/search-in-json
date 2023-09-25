import { ISearch, ISearchResult } from './interfaces';
import { getPath } from './get-path';
import { matchesIterator } from './iterator';
import { newLogger } from './logger';

export const search = <A extends boolean | undefined = undefined>({
  data,
  text,
  debug = false,
  ignoreCamelCase = false,
  regex,
  searchIn = 'values',
  withMapResult,
}: ISearch<A>): ISearchResult<A> => {
  const logger = newLogger(debug);
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

  logger.time('search');
  const matches = dataString.matchAll(regex);
  const mi = matchesIterator(matches, dataString);

  const resMap = getPath({
    dataString,
    data,
    searchIn,
    result: {},
    matches: mi,
    debug: true,
  });
  logger.timeEnd('search');

  if (withMapResult) {
    return {
      result: resMap.result as ISearchResult<A>['result'],
    };
  }

  return {
    result: Object.values(resMap.result) as ISearchResult<A>['result'],
  };
};
