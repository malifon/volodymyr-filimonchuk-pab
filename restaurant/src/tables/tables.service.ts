import { isString, isNumber } from "../utils/validator.utils";
import { ITable } from "./tables.modal";
import { readStorage, removeStorage, updateStorage } from "../utils/save.utils";
import { TABLE_PATH } from "../constants";

export const create = async (newItem: ITable): Promise<number | Error> => {
  let table: ITable[] = await readStorage(TABLE_PATH);

  if (
    !isString(newItem.title) ||
    !isString(newItem.status) ||
    !isNumber(newItem.countPerson)
  ) {
    throw new Error("This format is invalid!");
  }

  if (newItem.countPerson <= 0)
    throw new Error("Count person must be bigger them 0.");

  if (newItem.countPerson >= 20)
    throw new Error("Count person must be less them 20.");
  if (
    newItem.status !== "free" &&
    newItem.status !== "niedostepny" &&
    newItem.status !== "zajety"
  )
    throw new Error("This type not exist.");

  const id: number = +new Date();
  table.push({ id, ...newItem });

  await updateStorage(TABLE_PATH, table).then((res) => console.log(res));
  return id;
};

export const get = async (id: number): Promise<ITable | Error> => {
  let table: ITable[] = await readStorage(TABLE_PATH);

  const result = table.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This table not exist!");
};

export const getAll = async (): Promise<ITable[]> => {
  return await readStorage(TABLE_PATH);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let table: ITable[] = await readStorage(TABLE_PATH);
  const result = table.filter((i) => i.id === id)[0];

  if (result) {
    return await removeStorage(TABLE_PATH, id);
  }
  throw new Error("This table not exist!");
};

export const edit = async (newItem: ITable): Promise<ITable | Error> => {
  if (
    !isString(newItem.title) ||
    !isString(newItem.status) ||
    !isNumber(newItem.countPerson)
  ) {
    throw new Error("This format is invalid!");
  }

  if (newItem.countPerson <= 0)
    throw new Error("Count person must be bigger them 0.");
  if (newItem.countPerson >= 20)
    throw new Error("Count person must be less them 20.");

  if (
    newItem.status !== "free" &&
    newItem.status !== "niedostepny" &&
    newItem.status !== "zajety"
  )
    throw new Error("This type not exist.");

  let table: ITable[] = await readStorage(TABLE_PATH);

  let result = table.filter((i) => i.id === newItem.id)[0];

  if (result) {
    await updateStorage(TABLE_PATH, null, true, newItem);

    return newItem;
  }
  throw new Error("This table not exist!");
};
