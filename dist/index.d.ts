interface Map {
  [key: string]: string | number | boolean | Map | Array<any>;
}

export interface SearchResult {
  key: string;
  index: number;
  endIndex: number;
}

export function search(
  data: Map,
  text: string,
  debug?: boolean
): SearchResult[];
