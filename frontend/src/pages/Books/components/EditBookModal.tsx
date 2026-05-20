import { useEffect } from 'react';
import type { IBook, IAuthor } from '../types';

interface EditBookModalProps {
  show: boolean;
  book: IBook | null;
  onClose: () => void;
  onSave: (updatedBook: IBook) => void;
  authors: IAuthor[];
  // Состояния формы редактирования
  editTitle: string;
  setEditTitle: (val: string) => void;
  editAuthorId: number | '';
  setEditAuthorId: (val: number | '') => void;
  editStatus: string;
  setEditStatus: (val: string) => void;
  editAnnotation: string;
  setEditAnnotation: (val: string) => void;
}

const EditBookModal = ({
  show,
  book,
  onClose,
  onSave,
  authors,
  editTitle,
  setEditTitle,
  editAuthorId,
  setEditAuthorId,
  editStatus,
  setEditStatus,
  editAnnotation,
  setEditAnnotation,
}: EditBookModalProps) => {
  useEffect(() => {
    if (show && book) {
      setEditTitle(book.title);
      setEditAuthorId(book.author_id);
      setEditStatus(book.status);
      setEditAnnotation(book.annotation);
    }
  }, [show, book, setEditTitle, setEditAuthorId, setEditStatus, setEditAnnotation]);

  if (!show || !book) return null;

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert('Введите название книги');
      return;
    }
    if (!editAuthorId) {
      alert('Выберите автора');
      return;
    }
    const updated: IBook = {
      ...book,
      title: editTitle,
      author_id: editAuthorId as number,
      status: editStatus as IBook['status'],
      annotation: editAnnotation,
    };
    onSave(updated);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Редактировать книгу</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Закрыть" />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="editBookTitle" className="form-label">Название книги *</label>
                <input type="text" className="form-control" id="editBookTitle" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="editBookAuthor" className="form-label">Автор *</label>
                <select className="form-select" id="editBookAuthor" value={editAuthorId} onChange={e => setEditAuthorId(e.target.value === '' ? '' : Number(e.target.value))}>
                  <option value="">Выберите автора</option>
                  {authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="editBookStatus" className="form-label">Статус</label>
                <select className="form-select" id="editBookStatus" value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                  <option value="В плане">В плане</option>
                  <option value="Читаю">Читаю</option>
                  <option value="Прочел">Прочел</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="editBookAnnotation" className="form-label">Аннотация</label>
                <textarea className="form-control" id="editBookAnnotation" rows={3} value={editAnnotation} onChange={e => setEditAnnotation(e.target.value)} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Отменить</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;