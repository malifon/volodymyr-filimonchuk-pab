import express, { Request, Response } from "express";
import * as NoteService from "./notes.service";
import { INote } from "./notes.modal";

export const notesRouter = express.Router();

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const token = res.locals.login;

    let item: INote = req.body;

    if (!item.isPrivate) {
      item = { ...item, isPrivate: false };
    }

    const note = await NoteService.create(item, token);

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

notesRouter.get("/user/:userName", async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;

    let note = await NoteService.getAll(userName);

    note.filter((item) => !item.isPrivate);
    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

notesRouter.put("/", async (req: Request, res: Response) => {
  try {
    const token = res.locals.login;

    const item: INote = req.body;

    const note = await NoteService.edit(item, token);

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

notesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const token = res.locals.login;

    if (req.params.id) {
      let id: number = +req.params.id;

      const note = await NoteService.get(id, token);
      res.status(200).json(note);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

notesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const token = res.locals.login;

    const note = await NoteService.getAll(token);
    res.status(200).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

notesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const token = res.locals.login;

    if (req.params.id) {
      let id: number = +req.params.id;

      const note = await NoteService.remove(id, token);
      res.status(200).json(note);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
