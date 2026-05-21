// frontend/src/services/api.ts
const API_BASE = 'http://localhost:3000/api';

export interface Book {
  id: number;
  title: string;
  author_id: number;
  status: 'В плане' | 'Читаю' | 'Прочел';
  annotation: string;
  author?: { id: number; name: string };
}

export interface Author {
  id: number;
  name: string;
  books?: Book[];
}

// ---- Books ----
export const getBooks = async (filters?: { search?: string; authorId?: number | ''; status?: string }) => {
  const params = new URLSearchParams();
  if (filters?.search && filters.search.trim().length >= 3) params.append('search', filters.search.trim());
  if (filters?.authorId && filters.authorId !== '') params.append('authorId', String(filters.authorId));
  if (filters?.status && filters.status !== '') params.append('status', filters.status);
  const res = await fetch(`${API_BASE}/books?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json() as Promise<Book[]>;
};

export const createBook = async (book: Omit<Book, 'id'>) => {
  const res = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to create book');
  return res.json() as Promise<Book>;
};

export const updateBook = async (id: number, book: Partial<Book>) => {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to update book');
  return res.json() as Promise<Book>;
};

export const deleteBook = async (id: number) => {
  const res = await fetch(`${API_BASE}/books/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete book');
};

// ---- Authors ----
export const getAuthors = async (search?: string) => {
  const params = new URLSearchParams();
  if (search && search.trim().length >= 3) params.append('search', search.trim());
  const res = await fetch(`${API_BASE}/authors?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch authors');
  return res.json() as Promise<Author[]>;
};

export const createAuthor = async (name: string) => {
  const res = await fetch(`${API_BASE}/authors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create author');
  return res.json() as Promise<Author>;
};

export const updateAuthor = async (id: number, name: string) => {
  const res = await fetch(`${API_BASE}/authors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to update author');
  return res.json() as Promise<Author>;
};