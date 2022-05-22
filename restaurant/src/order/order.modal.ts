import { IMenu } from "../menu/menu.modal";

export interface IOrder {
  id: number;
  worker: number;
  table: number;
  position: IMenu[];
  status: "złozone" | "w realizacji" | "zrealizowane" | "rachunek";
  sum: number;
  reservation: number;
}
