import { isString, isNumber, isArray } from "../utils/validator.utils";
import { IOrder } from "./order.modal";
import { readStorage, removeStorage, updateStorage } from "../utils/save.utils";
import { ORDER_PATH } from "../constants";
import * as WorkerService from "../worker/worker.service";
import * as TableService from "../tables/tables.service";
import * as MenuService from "../menu/menu.service";
import * as ReservationService from "../reservations/reservations.service";

export const create = async (newItem: IOrder): Promise<number | Error> => {
  let order: IOrder[] = await readStorage(ORDER_PATH);

  if (
    !isString(newItem.status) ||
    !isNumber(newItem.worker) ||
    !isNumber(newItem.table) ||
    !isArray(newItem.position)
  ) {
    throw new Error("This format is invalid!");
  }

  const isWorker = await WorkerService.get(newItem.worker);
  const isTable = await TableService.get(newItem.table);
  const isReservation = await ReservationService.get(newItem.reservation);

  if (!isReservation) throw new Error("This reservation not exist.");
  if (!isTable) throw new Error("This table not exist.");
  if (!isWorker) throw new Error("This worker not exist.");

  let sum = 0;

  for (let i = 0; i < newItem.position.length; i++) {
    const el = newItem.position[i];
    const isMenu: any = await MenuService.get(el.id);
    if (isMenu && isMenu.price) {
      sum += isMenu.price;
    }
  }

  if (
    newItem.status !== "złozone" &&
    newItem.status !== "w realizacji" &&
    newItem.status !== "zrealizowane" &&
    newItem.status !== "rachunek"
  )
    throw new Error("This type not exist.");

  if (newItem.sum && sum < newItem.sum) {
    throw new Error("This sum can not less them menus summary!");
  }

  if (!newItem.sum) {
    newItem.sum = sum;
  }

  const id: number = +new Date();
  order.push({ id, ...newItem });

  await updateStorage(ORDER_PATH, order).then((res) => console.log(res));
  return id;
};

export const get = async (id: number): Promise<IOrder | Error> => {
  let order: IOrder[] = await readStorage(ORDER_PATH);

  const result = order.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This order not exist!");
};

export const getAll = async (): Promise<IOrder[]> => {
  return await readStorage(ORDER_PATH);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let order: IOrder[] = await readStorage(ORDER_PATH);
  const result = order.filter((i) => i.id === id)[0];

  if (result) {
    return await removeStorage(ORDER_PATH, id);
  }
  throw new Error("This order not exist!");
};

export const edit = async (newItem: IOrder): Promise<IOrder | Error> => {
  let order: IOrder[] = await readStorage(ORDER_PATH);

  if (
    !isString(newItem.status) ||
    !isNumber(newItem.worker) ||
    !isNumber(newItem.table) ||
    !isArray(newItem.position)
  ) {
    throw new Error("This format is invalid!");
  }

  const isWorker = await WorkerService.get(newItem.worker);
  const isTable = await TableService.get(newItem.table);
  const isReservation = await ReservationService.get(newItem.reservation);

  if (!isReservation) throw new Error("This reservation not exist.");
  if (!isTable) throw new Error("This table not exist.");
  if (!isWorker) throw new Error("This worker not exist.");

  let sum = 0;

  for (let i = 0; i < newItem.position.length; i++) {
    const el = newItem.position[i];
    const isMenu: any = await MenuService.get(el.id);
    if (isMenu && isMenu.price) {
      sum += isMenu.price;
    }
  }

  if (
    newItem.status !== "złozone" &&
    newItem.status !== "w realizacji" &&
    newItem.status !== "zrealizowane" &&
    newItem.status !== "rachunek"
  )
    throw new Error("This type not exist.");

  if (newItem.sum && sum < newItem.sum) {
    throw new Error("This sum can not less them menus summary!");
  }

  if (!newItem.sum) {
    newItem.sum = sum;
  }

  let result = order.filter((i) => i.id === newItem.id)[0];

  if (result) {
    await updateStorage(ORDER_PATH, null, true, newItem);

    return newItem;
  }
  throw new Error("This order not exist!");
};
