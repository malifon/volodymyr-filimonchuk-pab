import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { BLACKLIST_PATH, SECRET } from "../constants";

const jwt = require("jsonwebtoken");

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  let data = await fs.promises.readFile(BLACKLIST_PATH, "utf-8");
  let dataParse: string[] = JSON.parse(data);

  const isBlackList = dataParse.filter((i) => i === token);

  if (token === null || isBlackList.length !== 0) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err: any, decoded) => {
    if (err) return res.sendStatus(401);
    res.locals = decoded;
    next();
  });
}
