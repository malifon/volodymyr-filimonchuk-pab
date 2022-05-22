import { isString, isNumber, isValidDate } from "../utils/validator.utils";
import { IReservation } from "./reservations.modal";
import { readStorage, removeStorage, updateStorage } from "../utils/save.utils";
import { RESERVATION_PATH } from "../constants";

export const create = async (
  newItem: IReservation
): Promise<number | Error> => {
  let reservation: IReservation[] = await readStorage(RESERVATION_PATH);

  if (
    !isNumber(newItem.table) ||
    !isValidDate(newItem.start) ||
    !isValidDate(newItem.end) ||
    !isString(newItem.client)
  ) {
    throw new Error("This format is invalid!");
  }

  const dateNow = new Date();
  const startDate = new Date(newItem.start);
  const endDate = new Date(newItem.end);

  if (dateNow >= startDate || dateNow >= endDate || startDate >= endDate)
    throw new Error("Please select right date.");

  const id: number = +new Date();
  reservation.push({ id, ...newItem });

  await updateStorage(RESERVATION_PATH, reservation).then((res) =>
    console.log(res)
  );
  return id;
};

export const get = async (id: number): Promise<IReservation | Error> => {
  let reservation: IReservation[] = await readStorage(RESERVATION_PATH);

  const result = reservation.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This reservation not exist!");
};

export const getAll = async (): Promise<IReservation[]> => {
  return await readStorage(RESERVATION_PATH);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let reservation: IReservation[] = await readStorage(RESERVATION_PATH);
  const result = reservation.filter((i) => i.id === id)[0];

  if (result) {
    return await removeStorage(RESERVATION_PATH, id);
  }
  throw new Error("This reservation not exist!");
};

export const edit = async (
  newItem: IReservation
): Promise<IReservation | Error> => {

  if (
    !isNumber(newItem.id) ||
    !isNumber(newItem.table) ||
    !isValidDate(newItem.start) ||
    !isValidDate(newItem.end) ||
    !isString(newItem.client)
  ) {
    throw new Error("This format is invalid!");
  }

  const dateNow = new Date();
  const startDate = new Date(newItem.start);
  const endDate = new Date(newItem.end);

  if (dateNow >= startDate || dateNow >= endDate || startDate >= endDate)
    throw new Error("Please select right date.");

  let reservation: IReservation[] = await readStorage(RESERVATION_PATH);

  let result = reservation.filter((i) => i.id === newItem.id)[0];

  if (result) {
    await updateStorage(RESERVATION_PATH, null, true, newItem);

    return newItem;
  }
  throw new Error("This reservation not exist!");
};
