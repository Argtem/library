
export const books = [
  {
    id: 1,
    title: 'Книга 1',
    author_id: 1,
    status: "В плане",
    annotation: "Аннотация к книге 1"
  },
  {
    id: 2,
    title: 'Книга 2',
    author_id: 2,
    status: "Читаю",
    annotation: "Аннотация к книге 2"
  },
  {
    id: 3,
    title: 'Книга 3',
    author_id: 3,
    status: "Прочел",
    annotation: "Аннотация к книге 3"
  },
];

export const authors = [
  {
    id: 1,
    name: 'Петров С.С.',
  },
  {
    id: 2,
    name: 'Иванов С.С.',
  },
  {
    id: 3,
    name: 'Сидоров С.С.',
  },
];

export interface IBook {
  id: number,
  title: string,
  author_id: number,
  status: "В плане" | "Читаю" | "Прочел",
  annotation: string,
}
