import express from "express";
import { authRouter } from "./auth/auth.routers";
import { PORT } from "./constants";
import { notesRouter } from "./notes/notes.routers";
import { tagsRouter } from "./tags/tags.routers";
import { authenticateToken } from "./utils/isAuth";

const app = express();

app.use(express.json());

app.use("/note", authenticateToken, notesRouter);
app.use("/notes", authenticateToken, notesRouter);

app.use("/tag", authenticateToken, tagsRouter);
app.use("/tags", authenticateToken, tagsRouter);

app.use("/login", authRouter);

app.listen(PORT);
