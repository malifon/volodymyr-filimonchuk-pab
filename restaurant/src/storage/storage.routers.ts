import express, { Request, Response } from "express";
import * as StorageService from "./storage.service";
import { IStorage } from "./storage.modal";

export const storageRouter = express.Router();

storageRouter.post("/", async (req: Request, res: Response) => {
  try {
    let item: IStorage = req.body;

    const table = await StorageService.create(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

storageRouter.post("/demand", async (req: Request, res: Response) => {
  try {
    let item: IStorage[] = req.body;

    if (item.length > 0) {
      res.status(201).json("Your demand accept!");
    }

    throw new Error("Array is not null!");
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

storageRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: IStorage = req.body;

    const table = await StorageService.edit(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

storageRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await StorageService.get(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

storageRouter.get("/", async (req: Request, res: Response) => {
  try {
    let { sort } = req.params;
    let page: number = +req.params.number || 0;
    const table = await StorageService.getAll();
    let sortData = table;

    if (sort) {
      sortData = sortData.sort((a: IStorage, b: IStorage) => {
        if (sort === "asc") {
          return a.name > b.name ? 1 : 1;
        }
        return a.name < b.name ? 1 : 1;
      });
    }

    sortData.slice(5 * page, sortData.length);

    res.status(200).json(sortData);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

storageRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await StorageService.remove(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
