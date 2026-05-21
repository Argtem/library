import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const where: any = {};
    if (search && typeof search === 'string' && search.length >= 3) {
      where.name = { contains: search, mode: 'insensitive' };
    }
    const authors = await prisma.author.findMany({
      where,
      include: { books: true },
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(req.params.id) },
      include: { books: true },
    });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author' });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newAuthor = await prisma.author.create({ data: { name } });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create author' });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const updated = await prisma.author.update({
      where: { id: Number(req.params.id) },
      data: { name },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update author' });
  }
};