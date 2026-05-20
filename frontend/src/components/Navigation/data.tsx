
export const menu = [
  {
    id: 1,
    label: 'Книги',
    link: "/",
  },
  {
    id: 2,
    label: 'Авторы',
    link: "/authors",
  },
];

export interface IMenu {
  id: number,
  label: string,
  link: string,
}
