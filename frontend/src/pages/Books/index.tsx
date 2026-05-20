import { useState, useMemo } from 'react';
import FilterBooks from './Filter';
import AddBookModal from './components/AddBookModal';
import EditBookModal from './components/EditBookModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import type { IBook, IAuthor } from './types';
import { Book, BookHalf, CheckCircle, Plus, Pencil, Trash } from 'react-bootstrap-icons';

interface BooksProps {
  books: IBook[];
  authors: IAuthor[];
}

const Books = ({ books: initialBooks, authors }: BooksProps) => {
  const [books, setBooks] = useState<IBook[]>(initialBooks);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  // Состояния модалок
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [bookToDelete, setBookToDelete] = useState<IBook | null>(null);

  // Состояния форм
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthorId, setNewBookAuthorId] = useState<number | ''>('');
  const [newBookStatus, setNewBookStatus] = useState<string>('В плане');
  const [newBookAnnotation, setNewBookAnnotation] = useState('');

  const [editTitle, setEditTitle] = useState('');
  const [editAuthorId, setEditAuthorId] = useState<number | ''>('');
  const [editStatus, setEditStatus] = useState<string>('В плане');
  const [editAnnotation, setEditAnnotation] = useState('');

  // Вспомогательные функции
  const getAuthorName = (authorId: number): string => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Неизвестный автор';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'В плане': return <Book className="me-1" />;
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

  // Фильтрация книг
  const filteredBooks = useMemo(() => {
    let result = [...books];
    if (selectedAuthorId !== '') result = result.filter(b => b.author_id === selectedAuthorId);
    if (selectedStatus !== '') result = result.filter(b => b.status === selectedStatus);
    const trimmedSearch = searchText.trim();
    if (trimmedSearch.length >= 3) {
      const lower = trimmedSearch.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(lower));
    }
    return result;
  }, [books, searchText, selectedAuthorId, selectedStatus]);

  // Муляжи функций
  const handleAddBook = (bookData: Omit<IBook, 'id'>) => {
    const newId = Math.max(...books.map(b => b.id), 0) + 1;
    const newBook: IBook = { id: newId, ...bookData };
    setBooks([...books, newBook]);
    // Сброс формы
    setNewBookTitle('');
    setNewBookAuthorId('');
    setNewBookStatus('В плане');
    setNewBookAnnotation('');
    setShowAddModal(false);
    console.log('Книга добавлена (муляж):', newBook);
  };

  const handleEditBook = (updatedBook: IBook) => {
    setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
    setShowEditModal(false);
    setSelectedBook(null);
    console.log('Книга обновлена (муляж):', updatedBook);
  };

  const handleDeleteBook = () => {
    if (bookToDelete) {
      setBooks(books.filter(b => b.id !== bookToDelete.id));
      setShowDeleteModal(false);
      setBookToDelete(null);
      console.log('Книга удалена (муляж):', bookToDelete.title);
    }
  };

  const openEditModal = (book: IBook) => {
    setSelectedBook(book);
    setEditTitle(book.title);
    setEditAuthorId(book.author_id);
    setEditStatus(book.status);
    setEditAnnotation(book.annotation);
    setShowEditModal(true);
  };

  const openDeleteModal = (book: IBook) => {
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

      <div className="row">
        {filteredBooks.map(book => (
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

      {filteredBooks.length === 0 && <div className="alert alert-warning text-center">Книги не найдены</div>}

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