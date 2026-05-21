import { Router } from 'express';
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
} from '../controllers/authorController';

const router = Router();

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);
router.put('/:id', updateAuthor);

export default router;