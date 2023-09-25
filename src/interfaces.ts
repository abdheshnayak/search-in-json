interface Map {
  [key: string]: string | number | boolean | Map | Array<any>;
}

type matchResult = {
  index?: number;
  depth: number;
  cursorIndex: number;
  match: string;
};

export interface MatchIterator {
  getAll: () => matchResult[];
  length: number;
  next: () => {
    value: matchResult;
    done: boolean;
  };
  current: () => {
    value: matchResult;
  };
  prev: () => {
    value: matchResult;
    done: boolean;
  };
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
  foundIn?: 'keys' | 'values';
}

export interface ISearchResult<A> {
  result: ISResult<A>;
  error?: Error;
}

export interface IGetPath {
  debug?: boolean;
  data: any;
  dataString: string;
  result: {
    [key: string]: SearchResultItem;
  };
  searchInfo?: {
    key: string;
    depth: number;
    indent: number;
  };
  searchIn: 'values' | 'keys' | 'both';
  matches: MatchIterator;
}

export type ISearchInfoResult =
  | {
      index: number;
      key: string;
      found: true;
      foundIn: 'values' | 'keys';
    }
  | {
      depth: number;
      found: false;
    };
