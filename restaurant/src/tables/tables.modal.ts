export interface ITable {
  id: number;
  title: string;
  countPerson: number;
  status: 'free' | 'niedostepny' | 'zajety';
}
