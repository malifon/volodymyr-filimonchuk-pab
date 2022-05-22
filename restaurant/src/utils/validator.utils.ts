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
export function isObject(obj: any): obj is string[] {
  return typeof obj === "object" && obj !== null;
}

export function isArrayString(arr: any): arr is string[] {
  return isArray(arr) && arr.every((i) => typeof i === "string");
}

export function isValidDate(dateObject: any): dateObject is Date {
  return new Date(dateObject).toString() !== "Invalid Date";
}
