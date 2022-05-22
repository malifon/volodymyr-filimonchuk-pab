import express, { Request, Response } from "express";
import * as TableService from "./tables.service";
import { ITable } from "./tables.modal";

export const tableRouter = express.Router();

tableRouter.post("/", async (req: Request, res: Response) => {
  try {
    let item: ITable = req.body;

    const table = await TableService.create(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

tableRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: ITable = req.body;

    const table = await TableService.edit(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

tableRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await TableService.get(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

tableRouter.get("/", async (req: Request, res: Response) => {
  try {
    const table = await TableService.getAll();
    res.status(200).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

tableRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await TableService.remove(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
