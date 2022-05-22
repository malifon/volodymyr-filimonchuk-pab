import express, { Request, Response } from "express";
import * as MenuService from "./menu.service";
import { IMenu } from "./menu.modal";

export const menuRouter = express.Router();

menuRouter.post("/", async (req: Request, res: Response) => {
  try {
    let item: IMenu = req.body;

    const table = await MenuService.create(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

menuRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: IMenu = req.body;

    const table = await MenuService.edit(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

menuRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await MenuService.get(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

menuRouter.get("/", async (req: Request, res: Response) => {
  try {
    const table = await MenuService.getAll();
    res.status(200).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

menuRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await MenuService.remove(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
