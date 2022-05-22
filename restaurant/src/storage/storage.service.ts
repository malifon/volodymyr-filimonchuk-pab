import { isString, isNumber } from "../utils/validator.utils";
import { IStorage } from "./storage.modal";
import { readStorage, removeStorage, updateStorage } from "../utils/save.utils";
import { STORAGE_PATH } from "../constants";

export const create = async (newItem: IStorage): Promise<number | Error> => {
  let storage: IStorage[] = await readStorage(STORAGE_PATH);

  if (
    !isString(newItem.name) ||
    !isString(newItem.measure) ||
    !isNumber(newItem.count) ||
    !isNumber(newItem.price)
  ) {
    throw new Error("This format is invalid!");
  }

  const id: number = +new Date();
  storage.push({ id, ...newItem });

  await updateStorage(STORAGE_PATH, storage).then((res) => console.log(res));
  return id;
};

export const get = async (id: number): Promise<IStorage | Error> => {
  let storage: IStorage[] = await readStorage(STORAGE_PATH);

  const result = storage.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This storage not exist!");
};

export const getAll = async (): Promise<IStorage[]> => {
  return await readStorage(STORAGE_PATH);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let storage: IStorage[] = await readStorage(STORAGE_PATH);
  const result = storage.filter((i) => i.id === id)[0];

  if (result) {
    return await removeStorage(STORAGE_PATH, id);
  }
  throw new Error("This storage not exist!");
};

export const edit = async (newItem: IStorage): Promise<IStorage | Error> => {
  if (
    !isString(newItem.name) ||
    !isString(newItem.measure) ||
    !isNumber(newItem.count) ||
    !isNumber(newItem.price) ||
    !isNumber(newItem.id)
  ) {
    throw new Error("This format is invalid!");
  }

  let storage: IStorage[] = await readStorage(STORAGE_PATH);

  let result = storage.filter((i) => i.id === newItem.id)[0];

  if (result) {
    await updateStorage(STORAGE_PATH, null, true, newItem);

    return newItem;
  }
  throw new Error("This storage not exist!");
};
