import express, { Request, Response } from "express";
import * as RestaurantService from "./restaurant.service";
import { IRestaurant } from "./restaurant.modal";

export const restaurantRouter = express.Router();

restaurantRouter.post("/", async (req: Request, res: Response) => {
  try {
    let item: IRestaurant = req.body;

    const restaurant = await RestaurantService.create(item);

    res.status(201).json(restaurant);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

restaurantRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: IRestaurant = req.body;

    const restaurant = await RestaurantService.edit(item);

    res.status(201).json(restaurant);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

restaurantRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const restaurant = await RestaurantService.get(id);
      res.status(200).json(restaurant);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

restaurantRouter.get("/", async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantService.getAll();
    res.status(200).json(restaurant);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

restaurantRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let id: number = +req.params.id;

      const restaurant = await RestaurantService.remove(id);
      res.status(200).json(restaurant);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
