import express, { Request, Response } from "express";
import * as OrderService from "./order.service";
import { IOrder } from "./order.modal";
import * as ReservationService from "../reservations/reservations.service";
import * as TableService from "../tables/tables.service";

export const orderRouter = express.Router();

orderRouter.post("/", async (req: Request, res: Response) => {
  try {
    let item: IOrder = req.body;

    const table = await OrderService.create(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

orderRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: IOrder = req.body;

    const table = await OrderService.edit(item);

    res.status(201).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await OrderService.get(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

orderRouter.get("/", async (req: Request, res: Response) => {
  try {
    const table = await OrderService.getAll();
    res.status(200).json(table);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

orderRouter.get("/report_table/:id", async (req: Request, res: Response) => {
  try {
    let id: number = +req.params.id;

    const table = await OrderService.getAll();
    res.status(200).json(table.filter((i) => i.table === id));
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

orderRouter.get("/report_waiter/:id", async (req: Request, res: Response) => {
  try {
    let id: number = +req.params.id;

    const table = await OrderService.getAll();
    res.status(200).json(table.filter((i) => i.worker === id));
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

orderRouter.get(
  "/report_time/:startTime?:endTime",
  async (req: Request, res: Response) => {
    try {
      let startTime: Date = new Date(req.params.startTime);
      let endTime: Date = new Date(req.params.endTime);

      let reservation = await ReservationService.getAll();
      reservation = reservation.filter((i) => {
        if (i.start >= startTime && i.end >= endTime) return i;
      });

      const table = await OrderService.getAll();

      res
        .status(200)
        .json(
          table.filter((i) => reservation.some((j) => j.id === i.reservation))
        );
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).send(e.message);
      }
    }
  }
);

orderRouter.get(
  "/report_income/:startTime?:endTime",
  async (req: Request, res: Response) => {
    try {
      let startTime: Date = new Date(req.params.startTime);
      let endTime: Date = new Date(req.params.endTime);

      let reservation = await ReservationService.getAll();
      reservation = reservation.filter((i) => {
        if (i.start >= startTime && i.end >= endTime) return i;
      });

      const table = await TableService.getAll();

      let sum = 0;

      reservation.forEach((i) => {
        table.forEach((j) => {
          if (i.table === j.id) sum += j.countPerson;
        });
      });

      res.status(200).json(sum);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).send(e.message);
      }
    }
  }
);

orderRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const table = await OrderService.remove(id);
      res.status(200).json(table);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
