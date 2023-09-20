interface Map {
  [key: string]: string | number | boolean | Map | Array<any>;
}

export type search = (data: Map, text: string, debug?: boolean) => string;
