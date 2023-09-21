interface Map {
  [key: string]: string | number | boolean | Map | Array<any>;
}

export interface SearchResult {
  key: string;
  index: number;
  endIndex: number;
}

interface ISearch {
  data: Map;
  text: string;
  ignoreCamelCase?: boolean;
  debug?: boolean;
}

export function search(props: ISearch): SearchResult[];
