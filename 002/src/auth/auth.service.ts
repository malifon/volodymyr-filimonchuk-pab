import { SECRET } from "../constants";
import { isString } from "../utils/validator.utils";
import { IUser } from "./auth.modal";
const jwt = require("jsonwebtoken");

export const create = async (user: IUser): Promise<string | Error> => {
  if (!user.login || !user.password) {
    throw new Error("Login and password are required!");
  }
  if (!isString(user.login) || !isString(user.password)) {
    throw new Error("Login and password are not valid format!");
  }
  return jwt.sign(user, SECRET, { expiresIn: "1800s" });
};
