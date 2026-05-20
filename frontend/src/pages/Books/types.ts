// src/pages/Books/types.ts
export interface IBook {
  id: number;
  title: string;
  author_id: number;
  status: 'В плане' | 'Читаю' | 'Прочел';
  annotation: string;
}

export interface IAuthor {
  id: number;
  name: string;
}