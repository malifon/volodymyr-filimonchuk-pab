import express, { Request, Response } from "express";
import * as ReservationService from "./reservations.service";
import { IReservation } from "./reservations.modal";

export const reservationRouter = express.Router();

reservationRouter.post("/", async (req: Request, res: Response) => {
  try {
    let item: IReservation = req.body;

    const table = await ReservationService.create(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

reservationRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: IReservation = req.body;

    const table = await ReservationService.edit(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

reservationRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await ReservationService.get(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

reservationRouter.get("/", async (req: Request, res: Response) => {
  try {
    const table = await ReservationService.getAll();
    res.status(200).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

reservationRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await ReservationService.remove(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
