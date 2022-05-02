import express, { Request, Response } from "express";
import * as TagService from "./tags.service";
import { ITag } from "./tags.modal";

export const tagsRouter = express.Router();

tagsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: ITag = req.body;

    const note = await TagService.create(item);

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
tagsRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: ITag = req.body;

    const note = await TagService.edit(item);

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

tagsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const note = await TagService.get(id);
      res.status(200).json(note);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

tagsRouter.get("*", async (req: Request, res: Response) => {
  try {
    const note = await TagService.getAll();
    res.status(200).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

tagsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const note = await TagService.remove(id);
      res.status(200).json(note);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
