import { isString, isNumber, isObject } from "../utils/validator.utils";
import { IWorker } from "./worker.modal";
import { readStorage, removeStorage, updateStorage } from "../utils/save.utils";
import { WORKER_PATH } from "../constants";

export const create = async (
  newItem: IWorker
): Promise<number | Error> => {
  let worker: IWorker[] = await readStorage(WORKER_PATH);

  if (
    !isString(newItem.firstName) ||
    !isString(newItem.lastName) ||
    !isString(newItem.position) ||
    !isNumber(newItem.restaurantId) 
  ) {
    throw new Error("This format is invalid!");
  }

  const id: number = +new Date();
  worker.push({ id, ...newItem });

  await updateStorage(WORKER_PATH, worker).then((res) =>
    console.log(res)
  );
  return id;
};

export const get = async (id: number): Promise<IWorker | Error> => {
  let worker: IWorker[] = await readStorage(WORKER_PATH);

  const result = worker.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This worker not exist!");
};

export const getAll = async (): Promise<IWorker[]> => {
  return await readStorage(WORKER_PATH);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let worker: IWorker[] = await readStorage(WORKER_PATH);
  const result = worker.filter((i) => i.id === id)[0];

  if (result) {
    return await removeStorage(WORKER_PATH, id);
  }
  throw new Error("This worker not exist!");
};

export const edit = async (
  newItem: IWorker
): Promise<IWorker | Error> => {


  if (
    !isString(newItem.firstName) ||
    !isString(newItem.lastName) ||
    !isString(newItem.position) ||
    !isNumber(newItem.id) ||
    !isNumber(newItem.restaurantId) 
  ) {
    throw new Error("This format is invalid!");
  }

  let worker: IWorker[] = await readStorage(WORKER_PATH);

  let result = worker.filter((i) => i.id === newItem.id)[0];

  if (result) {
    await updateStorage(WORKER_PATH, null, true, newItem);

    return newItem;
  }
  throw new Error("This worker not exist!");
};
