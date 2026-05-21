import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { search, authorId, status } = req.query;
    const where: any = {};
    if (authorId) where.author_id = Number(authorId);
    if (status) where.status = status as string;
    if (search && typeof search === 'string' && search.length >= 3) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    const books = await prisma.book.findMany({
      where,
      include: { author: true },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(req.params.id) },
      include: { author: true },
    });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author_id, status, annotation } = req.body;
    const newBook = await prisma.book.create({
      data: { title, author_id, status, annotation },
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, author_id, status, annotation } = req.body;
    const updated = await prisma.book.update({
      where: { id: Number(req.params.id) },
      data: { title, author_id, status, annotation },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await prisma.book.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};