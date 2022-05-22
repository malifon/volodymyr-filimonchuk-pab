import express, { Request, Response } from "express";
import * as WorkerService from "./worker.service";
import { IWorker } from "./worker.modal";

export const workerRouter = express.Router();

workerRouter.post("/", async (req: Request, res: Response) => {
  try {
    let item: IWorker = req.body;

    const table = await WorkerService.create(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

workerRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: IWorker = req.body;

    const table = await WorkerService.edit(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

workerRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await WorkerService.get(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

workerRouter.get("/", async (req: Request, res: Response) => {
  try {
    const table = await WorkerService.getAll();
    res.status(200).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

workerRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await WorkerService.remove(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
