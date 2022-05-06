import { NextFunction, Request, Response } from "express";
import { SECRET } from "../constants";

const jwt = require("jsonwebtoken");

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err: any, decoded) => {
    if (err) return res.sendStatus(401);
    res.locals = decoded;
    next();
  });
}
