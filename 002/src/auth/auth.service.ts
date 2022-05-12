import { ADMIN, NOTES_FILE, SECRET, TAGS_FILE, USERS_FILE } from "../constants";
import { readStorage, updateStorage } from "../utils/save.utils";
import { isNumber, isString } from "../utils/validator.utils";
import { IUser } from "./auth.modal";
const jwt = require("jsonwebtoken");

export const create = async (user: IUser): Promise<string | Error> => {
  if (!user.login || !user.password) {
    throw new Error("Login and password are required!");
  }
  if (!isString(user.login) || !isString(user.password)) {
    throw new Error("Login and password are not valid format!");
  }
  let users: IUser[] = await readStorage(USERS_FILE);
  const id: number = +new Date();

  users.push({ ...user, id });

  await updateStorage(USERS_FILE, users);
  return jwt.sign(user, SECRET, { expiresIn: "1800s" });
};

export const edit = async (
  user: IUser,
  login: string
): Promise<IUser | Error> => {
  if (!isString(user.name) || !isNumber(user.years)) {
    throw new Error("This format is invalid!");
  }

  if (user.login !== login && login !== ADMIN) {
    throw new Error("This user not edit account!");
  }

  let users: IUser[] = await readStorage(USERS_FILE);

  let result = users.filter((i) => i.login === user.login)[0];

  if (result) {
    users = users.map((i) => (i.login !== user.login ? user : i));
    await updateStorage(USERS_FILE, users, true, result);
    return user;
  }
  throw new Error("This user not exist!");
};

export const get = async (
  userName: string,
  login: string
): Promise<IUser | Error> => {
  if (userName !== login && login !== ADMIN) {
    throw new Error("This user not get account data!");
  }

  let users: IUser[] = await readStorage(USERS_FILE);

  let result = users.filter((i) => i.login === userName)[0];

  if (result) {
    return result;
  }
  throw new Error("This user not exist!");
};

export const getAll = async (login: string): Promise<IUser[]> => {
  if (login !== ADMIN) {
    throw new Error("Only admin get all Users!");
  }
  return await readStorage(USERS_FILE);
};

export const remove = async (
  user: string,
  login: string
): Promise<undefined | Error> => {
  if (login !== ADMIN) {
    throw new Error("Only admin has remove user!");
  }

  let users: IUser[] = await readStorage(USERS_FILE);

  let result: IUser[] = users.filter((i) => i.login === user);

  if (result[0]) {
    result = users.filter((i) => i.login !== user);
    await updateStorage(USERS_FILE, users);
    await updateStorage(user + NOTES_FILE, []);
    await updateStorage(user + TAGS_FILE, []);
    return;
  }

  throw new Error("This user not exist!");
};
