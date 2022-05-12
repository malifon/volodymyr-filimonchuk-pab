import fs from "fs";
import express, { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { IUser } from "./auth.modal";
import { ADMIN, BLACKLIST_PATH } from "../constants";
const jwt = require("jsonwebtoken");


export const authRouter = express.Router();

authRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;
    const token = await AuthService.create(user);

    res.status(200).json(token);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(401).send(e.message);
    }
  }
})
authRouter.post("/signout", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    let data = await fs.promises.readFile(BLACKLIST_PATH, "utf-8");
    let dataParse: string[] = JSON.parse(data);
    dataParse.push(token)
     await fs.promises.writeFile(
      BLACKLIST_PATH,
      JSON.stringify(dataParse)
    );

    res.status(200).json("OK");
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(401).send(e.message);
    }
  }
});

authRouter.put("/editUser", async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;

    const login = res.locals.login;

    const token = await AuthService.edit(user, login);
    res.status(200).json(token);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(401).send(e.message);
    }
  }
});

authRouter.get("/allUser", async (req: Request, res: Response) => {
  try {
    const token = await AuthService.getAll(res.locals.login);
    res.status(200).json(token);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(401).send(e.message);
    }
  }
});

authRouter.get("/:userName", async (req: Request, res: Response) => {
  try {
    const userData = await AuthService.get(
      req.params.userName,
      res.locals.login
    );
    res.status(200).json(userData);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(401).send(e.message);
    }
  }
});

authRouter.delete("/:userName", async (req: Request, res: Response) => {
  try {
    const token = await AuthService.remove(
      req.params.userName,
      res.locals.login
    );
    res.status(200).json(token);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(401).send(e.message);
    }
  }
});


