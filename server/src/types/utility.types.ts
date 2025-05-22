export type Pretty<Type extends object> = {
  [k in keyof Type]: Type[k];
};