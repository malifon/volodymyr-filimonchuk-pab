import express, { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { IUser } from "./auth.modal";

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
});
