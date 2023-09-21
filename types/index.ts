interface Map {
  [key: string]: string | number | boolean | Map | Array<any>;
}

export interface SearchResult {
  key: string;
  index: number;
  endIndex: number;
}

export interface ISearch {
  data: Map;
  text?: string;
  ignoreCamelCase?: boolean;
  debug?: boolean;
  regex?: RegExp;
}

export interface SearchResultItem {
  key: string;
  index?: number;
  endIndex: number;
}

export interface ISearchResult {
  result: SearchResultItem[];
  error?: Error;
}
