import {
  isString,
  isArray,
  isNumber,
  isArrayString,
} from "../utils/validator.utils";
import { IRestaurant } from "./restaurant.modal";
import { readStorage, removeStorage, updateStorage } from "../utils/save.utils";
import { RESTAURANT_PATH } from "../constants";

export const create = async (newItem: IRestaurant): Promise<number | Error> => {
  let restaurant: IRestaurant[] = await readStorage(RESTAURANT_PATH);
  console.log("restaurant: ", restaurant);
  
  if (
    !isString(newItem.title) ||
    !isString(newItem.address) ||
    !isString(newItem.email) ||
    !isNumber(newItem.nip) ||
    !isNumber(newItem.phone)
  ) {
    throw new Error("This format is invalid!");
  }

  if (newItem.nip.toString().length !== 11)
    throw new Error("Field NIP is invalid!");

  const id: number = +new Date();
  restaurant.push({ id, ...newItem });

  await updateStorage(RESTAURANT_PATH, restaurant).then((res) =>
    console.log(res)
  );
  return id;
};

export const get = async (id: number): Promise<IRestaurant | Error> => {
  let restaurant: IRestaurant[] = await readStorage(RESTAURANT_PATH);

  const result = restaurant.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This restaurant not exist!");
};

export const getAll = async (): Promise<IRestaurant[]> => {
  return await readStorage(RESTAURANT_PATH);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let restaurant: IRestaurant[] = await readStorage(RESTAURANT_PATH);
  const result = restaurant.filter((i) => i.id === id)[0];

  if (result) {
    return await removeStorage(RESTAURANT_PATH, id);
  }
  throw new Error("This restaurant not exist!");
};

export const edit = async (
  newItem: IRestaurant
): Promise<IRestaurant | Error> => {
  if (
    !isString(newItem.title) ||
    !isString(newItem.address) ||
    !isString(newItem.email) ||
    !isNumber(newItem.nip) ||
    !isNumber(newItem.phone)
  ) {
    throw new Error("This format is invalid!");
  }

  if (newItem.nip.toString().length !== 11)
    throw new Error("Field NIP is invalid!");

  let restaurant: IRestaurant[] = await readStorage(RESTAURANT_PATH);

  let result = restaurant.filter((i) => i.id === newItem.id)[0];

  if (result) {
    await updateStorage(RESTAURANT_PATH, null, true, newItem);

    return newItem;
  }
  throw new Error("This restaurant not exist!");
};
