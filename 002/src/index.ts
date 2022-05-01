import express from 'express'
import {Request, Response} from 'express'
import { notesRouter } from './notes/notes.routers';

const app = express()

app.use(express.json())

app.use("/note", notesRouter);

app.listen(3000)