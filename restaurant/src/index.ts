// TODO:
// 1. Restaurant - done
// 2. Tables - done
// 3. Reservations - done
// 4. Worker - done
// 5. Magazyn produktów -done
// 6. Menu - done
// 7. Zamówienia - done
// 8. Raports:
//     - order per kelner - done
//     - order per time - done
//     - guests per time - done

import express from "express";
import { PORT } from "./constants";
import { menuRouter } from "./menu/menu.routers";
import { orderRouter } from "./order/order.routers";
import { reservationRouter } from "./reservations/reservations.routers";
import { restaurantRouter } from "./restaurant/restaurant.routers";
import { storageRouter } from "./storage/storage.routers";
import { tableRouter } from "./tables/table.routers";
import { workerRouter } from "./worker/worker.routers";

const app = express();

app.use(express.json());

app.use("/restaurant", restaurantRouter);
app.use("/restaurants", restaurantRouter);

app.use("/table", tableRouter);
app.use("/tables", tableRouter);

app.use("/reservation", reservationRouter);
app.use("/reservations", reservationRouter);

app.use("/worker", workerRouter);
app.use("/workers", workerRouter);

app.use("/menu", menuRouter);
app.use("/menuList", menuRouter);

app.use("/storage", storageRouter);
app.use("/storages", storageRouter);

app.use("/order", orderRouter);
app.use("/orders", orderRouter);

app.listen(PORT);
