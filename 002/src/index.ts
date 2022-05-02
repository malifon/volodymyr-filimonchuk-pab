import express from "express";
import { PORT } from "./constants";
import { notesRouter } from "./notes/notes.routers";
import { tagsRouter } from "./tags/tags.routers";

const app = express();

app.use(express.json());

app.use("/note", notesRouter);
app.use("/notes", notesRouter);

app.use("/tag", tagsRouter);
app.use("/tags", tagsRouter);

app.listen(PORT);
