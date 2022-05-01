import express, { ErrorRequestHandler, Request, Response } from "express";
import * as NoteService from "./notes.service";
import { INote } from "./notes.modal";

export const notesRouter = express.Router();

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: INote = req.body;

    const note = await NoteService.create(item);

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
notesRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: INote = req.body;

    const note = await NoteService.edit(item);

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

notesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const note = await NoteService.get(id);
      res.status(200).json(note);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

notesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const note = await NoteService.remove(id);
      res.status(200).json(note);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
