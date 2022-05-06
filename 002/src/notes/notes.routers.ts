import express, { Request, Response } from "express";
import * as NoteService from "./notes.service";
import { INote } from "./notes.modal";

export const notesRouter = express.Router();

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || "iesratfwagvocyuvnaryst";

    let item: INote = req.body;

    if (!item.isPrivate) {
      item = { ...item, isPrivate: false };
    }

    const note = await NoteService.create(item, token.slice(0, 10));

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

notesRouter.post("/user/:userName", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || "iesratfwagvocyuvnaryst";

    const { userName } = req.params;

    let item: INote = req.body;

    if (!item.isPrivate) {
      item = { ...item, isPrivate: false };
    }

    const note = await NoteService.create(
      item,
      userName + "-" + token.slice(0, 10)
    );

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

notesRouter.get("/user/:userName", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || "iesratfwagvocyuvnaryst";

    const { userName } = req.params;

    let note = await NoteService.getAll(userName + "-" + token.slice(0, 10));

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
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || "iesratfwagvocyuvnaryst";

    const item: INote = req.body;

    const note = await NoteService.edit(item, token.slice(0, 10));

    res.status(201).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

notesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || "iesratfwagvocyuvnaryst";

    if (req.params.id) {
      let id: number = +req.params.id;

      const note = await NoteService.get(id, token.slice(0, 10));
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
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || "iesratfwagvocyuvnaryst";

    const note = await NoteService.getAll(token.slice(0, 10));
    res.status(200).json(note);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

notesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || "iesratfwagvocyuvnaryst";

    if (req.params.id) {
      let id: number = +req.params.id;

      const note = await NoteService.remove(id, token.slice(0, 10));
      res.status(200).json(note);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
