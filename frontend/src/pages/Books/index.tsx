import { useState, useEffect, useCallback } from 'react';
import FilterBooks from './Filter';
import AddBookModal from './components/AddBookModal';
import EditBookModal from './components/EditBookModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { Book, Author, getBooks, createBook, updateBook, deleteBook, getAuthors } from '@/services/api';
import { Book as BookIcon, BookHalf, CheckCircle, Plus, Pencil, Trash } from 'react-bootstrap-icons';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Фильтры
  const [searchText, setSearchText] = useState<string>('');
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  // Состояния модалок
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // Состояния форм
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthorId, setNewBookAuthorId] = useState<number | ''>('');
  const [newBookStatus, setNewBookStatus] = useState<string>('В плане');
  const [newBookAnnotation, setNewBookAnnotation] = useState('');

  const [editTitle, setEditTitle] = useState('');
  const [editAuthorId, setEditAuthorId] = useState<number | ''>('');
  const [editStatus, setEditStatus] = useState<string>('В плане');
  const [editAnnotation, setEditAnnotation] = useState('');

  // Загрузка авторов (один раз)
  useEffect(() => {
    getAuthors()
      .then(setAuthors)
      .catch(console.error);
  }, []);

  // Загрузка книг с учётом фильтров
  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBooks({
        search: searchText,
        authorId: selectedAuthorId,
        status: selectedStatus,
      });
      setBooks(data);
    } catch (error) {
      console.error('Failed to load books:', error);
    } finally {
      setLoading(false);
    }
  }, [searchText, selectedAuthorId, selectedStatus]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const getAuthorName = (authorId: number): string => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Неизвестный автор';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'В плане': return <BookIcon className="me-1" />;
      case 'Читаю': return <BookHalf className="me-1" />;
      case 'Прочел': return <CheckCircle className="me-1" />;
      default: return null;
    }
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'В плане': return 'bg-warning text-dark';
      case 'Читаю': return 'bg-info text-dark';
      case 'Прочел': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  // CRUD операции
  const handleAddBook = async (bookData: Omit<Book, 'id'>) => {
    try {
      const newBook = await createBook(bookData);
      setBooks(prev => [...prev, newBook]);
      setNewBookTitle('');
      setNewBookAuthorId('');
      setNewBookStatus('В плане');
      setNewBookAnnotation('');
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add book:', error);
      alert('Не удалось добавить книгу');
    }
  };

  const handleEditBook = async (updatedBook: Book) => {
    try {
      const result = await updateBook(updatedBook.id, {
        title: updatedBook.title,
        author_id: updatedBook.author_id,
        status: updatedBook.status,
        annotation: updatedBook.annotation,
      });
      setBooks(prev => prev.map(b => b.id === result.id ? result : b));
      setShowEditModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error('Failed to update book:', error);
      alert('Не удалось обновить книгу');
    }
  };

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;
    try {
      await deleteBook(bookToDelete.id);
      setBooks(prev => prev.filter(b => b.id !== bookToDelete.id));
      setShowDeleteModal(false);
      setBookToDelete(null);
    } catch (error) {
      console.error('Failed to delete book:', error);
      alert('Не удалось удалить книгу');
    }
  };

  const openEditModal = (book: Book) => {
    setSelectedBook(book);
    setEditTitle(book.title);
    setEditAuthorId(book.author_id);
    setEditStatus(book.status);
    setEditAnnotation(book.annotation);
    setShowEditModal(true);
  };

  const openDeleteModal = (book: Book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary btn-lg" onClick={() => setShowAddModal(true)}>
          <Plus className="me-2" /> Добавить книгу
        </button>
      </div>

      <FilterBooks
        authors={authors}
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedAuthorId={selectedAuthorId}
        onAuthorChange={setSelectedAuthorId}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {loading && <div className="text-center">Загрузка...</div>}

      <div className="row">
        {!loading && books.map(book => (
          <div key={book.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm position-relative">
              <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
                <button className="btn btn-warning btn-sm" onClick={() => openEditModal(book)} title="Редактировать">
                  <Pencil />
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(book)} title="Удалить">
                  <Trash />
                </button>
              </div>
              <div className="card-body text-start pt-5">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{getAuthorName(book.author_id)}</h6>
                <p className="card-text">{book.annotation}</p>
              </div>
              <div className="card-footer bg-transparent text-start">
                <span className={`badge ${getStatusClass(book.status)} d-inline-flex align-items-center`}>
                  {getStatusIcon(book.status)} {book.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && books.length === 0 && (
        <div className="alert alert-warning text-center">Книги не найдены</div>
      )}

      {/* Модалки */}
      <AddBookModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddBook}
        authors={authors}
        title={newBookTitle}
        setTitle={setNewBookTitle}
        authorId={newBookAuthorId}
        setAuthorId={setNewBookAuthorId}
        status={newBookStatus}
        setStatus={setNewBookStatus}
        annotation={newBookAnnotation}
        setAnnotation={setNewBookAnnotation}
      />

      <EditBookModal
        show={showEditModal}
        book={selectedBook}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditBook}
        authors={authors}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editAuthorId={editAuthorId}
        setEditAuthorId={setEditAuthorId}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        editAnnotation={editAnnotation}
        setEditAnnotation={setEditAnnotation}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        bookTitle={bookToDelete?.title || ''}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteBook}
      />
    </div>
  );
};

export default Books;