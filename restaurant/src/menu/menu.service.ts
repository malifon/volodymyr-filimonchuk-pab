import { isString, isNumber, isObject } from "../utils/validator.utils";
import { IMenu } from "./menu.modal";
import { readStorage, removeStorage, updateStorage } from "../utils/save.utils";
import { MENU_PATH } from "../constants";

export const create = async (newItem: IMenu): Promise<number | Error> => {
  let menu: IMenu[] = await readStorage(MENU_PATH);

  if (
    !isString(newItem.title) ||
    !isString(newItem.category) ||
    !isNumber(newItem.price)
  ) {
    throw new Error("This format is invalid!");
  }

  const id: number = +new Date();
  menu.push({ id, ...newItem });

  await updateStorage(MENU_PATH, menu).then((res) => console.log(res));
  return id;
};

export const get = async (id: number): Promise<IMenu | Error> => {
  let menu: IMenu[] = await readStorage(MENU_PATH);

  const result = menu.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This menu not exist!");
};

export const getAll = async (): Promise<IMenu[]> => {
  return await readStorage(MENU_PATH);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let menu: IMenu[] = await readStorage(MENU_PATH);
  const result = menu.filter((i) => i.id === id)[0];

  if (result) {
    return await removeStorage(MENU_PATH, id);
  }
  throw new Error("This menu not exist!");
};

export const edit = async (newItem: IMenu): Promise<IMenu | Error> => {
  if (
    !isString(newItem.title) ||
    !isString(newItem.category) ||
    !isNumber(newItem.price) ||
    !isNumber(newItem.id)
  ) {
    throw new Error("This format is invalid!");
  }

  let menu: IMenu[] = await readStorage(MENU_PATH);

  let result = menu.filter((i) => i.id === newItem.id)[0];

  if (result) {
    await updateStorage(MENU_PATH, null, true, newItem);

    return newItem;
  }
  throw new Error("This menu not exist!");
};
