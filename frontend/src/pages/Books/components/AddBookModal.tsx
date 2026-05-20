import { useEffect } from 'react';
import type { IAuthor } from '../types';

interface AddBookModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (bookData: {
    title: string;
    author_id: number;
    status: string;
    annotation: string;
  }) => void;
  authors: IAuthor[];
  // Состояния формы
  title: string;
  setTitle: (val: string) => void;
  authorId: number | '';
  setAuthorId: (val: number | '') => void;
  status: string;
  setStatus: (val: string) => void;
  annotation: string;
  setAnnotation: (val: string) => void;
}

const AddBookModal = ({
  show,
  onClose,
  onSave,
  authors,
  title,
  setTitle,
  authorId,
  setAuthorId,
  status,
  setStatus,
  annotation,
  setAnnotation,
}: AddBookModalProps) => {
  // Очистка формы при закрытии (опционально, можно в родителе)
  useEffect(() => {
    if (!show) {
      // Можно сбросить, но родитель сам сбросит после сохранения/отмены
    }
  }, [show]);

  if (!show) return null;

  const handleSave = () => {
    if (!title.trim()) {
      alert('Введите название книги');
      return;
    }
    if (!authorId) {
      alert('Выберите автора');
      return;
    }
    onSave({ title, author_id: authorId, status, annotation });
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Добавить новую книгу</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Закрыть" />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="bookTitle" className="form-label">Название книги *</label>
                <input type="text" className="form-control" id="bookTitle" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="bookAuthor" className="form-label">Автор *</label>
                <select className="form-select" id="bookAuthor" value={authorId} onChange={e => setAuthorId(e.target.value === '' ? '' : Number(e.target.value))}>
                  <option value="">Выберите автора</option>
                  {authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="bookStatus" className="form-label">Статус</label>
                <select className="form-select" id="bookStatus" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="В плане">В плане</option>
                  <option value="Читаю">Читаю</option>
                  <option value="Прочел">Прочел</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="bookAnnotation" className="form-label">Аннотация</label>
                <textarea className="form-control" id="bookAnnotation" rows={3} value={annotation} onChange={e => setAnnotation(e.target.value)} />
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

export default AddBookModal;