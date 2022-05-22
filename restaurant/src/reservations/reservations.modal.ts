export interface IReservation {
  id: number;
  table: number;
  start: Date;
  end: Date;
  client: string;
}
