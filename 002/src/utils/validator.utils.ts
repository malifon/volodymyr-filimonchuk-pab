export function isString(obj: any): obj is string {
  return typeof obj === "string";
}
export function isNumber(obj: any): obj is number {
  return typeof obj === "number";
}
export function isBoolean(obj: any): obj is boolean {
  return typeof obj === "boolean";
}
export function isArray(obj: any): obj is string[] {
  return Object.prototype.toString.call(obj) === "[object Array]";
}
