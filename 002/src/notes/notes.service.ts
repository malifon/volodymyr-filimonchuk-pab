import { INote } from "./notes.modal";

let notes: INote[] = [];

function isString(obj: any): obj is string {
  return typeof obj === "string";
}
function isNumber(obj: any): obj is number {
  return typeof obj === "number";
}
function isBoolean(obj: any): obj is boolean {
  return typeof obj === "boolean";
}
function isArray(obj: any): obj is string[] {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

export const create = async (newItem: INote): Promise<number | Error> => {
  if (!isString(newItem.title) || !isString(newItem.content)) {
    throw new Error("This format is invalid!");
  }

  if (newItem.createDate && !isString(newItem.createDate))
    throw new Error("Field createDate is invalid!");
  if (newItem.type && !isArray(newItem.type))
    throw new Error("Field type is invalid!");

  const id: number = +new Date();
  notes.push({ id, ...newItem });
  return id;
};

export const get = async (id: number): Promise<INote | Error> => {
  const result = notes.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This note not exist!");
};

export const remove = async (id: number): Promise<undefined | Error> => {
  const result = notes.filter((i) => i.id === id)[0];

  if (result) {
    notes = notes.filter((i) => i.id !== id);
    return;
  }
  throw new Error("This note not exist!");
};

export const edit = async (newItem: INote): Promise<INote | Error> => {
  if (
    !isString(newItem.title) ||
    !isString(newItem.content) ||
    !isNumber(newItem.id)
  ) {
    throw new Error("This format is invalid!");
  }

  if (newItem.createDate && !isString(newItem.createDate))
    throw new Error("Field createDate is invalid!");
  if (newItem.type && !isArray(newItem.type))
    throw new Error("Field type is invalid!");

  let result = notes.filter((i) => i.id === newItem.id)[0];

  if (result) {
    notes = notes.map((i) => (i.id !== newItem.id ? newItem : i));
    return newItem;
  }
  throw new Error("This note not exist!");
};
