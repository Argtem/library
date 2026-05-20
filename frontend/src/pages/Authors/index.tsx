// src/pages/Authors/index.tsx
import { useState, useMemo } from 'react';
import FilterAuthors from './Filter';
import AddAuthorModal from './components/AddAuthorModal';
import EditAuthorModal from './components/EditAuthorModal';
import type { IAuthor, IBook } from '../Books/types';
import { Book, BookHalf, CheckCircle, Pencil, Plus } from 'react-bootstrap-icons';

interface AuthorsProps {
  authors: IAuthor[];
  books: IBook[];
}

const Authors = ({ authors: initialAuthors, books }: AuthorsProps) => {
  const [authors, setAuthors] = useState<IAuthor[]>(initialAuthors);
  const [searchText, setSearchText] = useState<string>('');

  // Состояния модалок
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor | null>(null);

  // Состояния форм
  const [newAuthorName, setNewAuthorName] = useState('');
  const [editAuthorName, setEditAuthorName] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'В плане': return <Book />;
      case 'Читаю': return <BookHalf />;
      case 'Прочел': return <CheckCircle />;
      default: return null;
    }
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'В плане': return 'bg-warning';
      case 'Читаю': return 'bg-info';
      case 'Прочел': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  // Фильтрация авторов по имени (от 3 символов)
  const filteredAuthors = useMemo(() => {
    const trimmedSearch = searchText.trim();
    if (trimmedSearch.length < 3) return authors;
    const lowerSearch = trimmedSearch.toLowerCase();
    return authors.filter(author =>
      author.name.toLowerCase().includes(lowerSearch)
    );
  }, [authors, searchText]);

  const getBooksByAuthor = (authorId: number): IBook[] => {
    return books.filter(book => book.author_id === authorId);
  };

  // Муляжи функций
  const handleAddAuthor = (name: string) => {
    const newId = Math.max(...authors.map(a => a.id), 0) + 1;
    const newAuthor: IAuthor = { id: newId, name };
    setAuthors([...authors, newAuthor]);
    setNewAuthorName('');
    setShowAddModal(false);
    console.log('Автор добавлен (муляж):', newAuthor);
  };

  const handleEditAuthor = (updatedAuthor: IAuthor) => {
    setAuthors(authors.map(a => a.id === updatedAuthor.id ? updatedAuthor : a));
    setShowEditModal(false);
    setSelectedAuthor(null);
    console.log('Автор обновлён (муляж):', updatedAuthor);
  };

  const openEditModal = (author: IAuthor) => {
    setSelectedAuthor(author);
    setEditAuthorName(author.name);
    setShowEditModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary btn-lg" onClick={() => setShowAddModal(true)}>
          <Plus className="me-2" /> Добавить автора
        </button>
      </div>

      <FilterAuthors searchText={searchText} onSearchChange={setSearchText} />

      <div className="row">
        {filteredAuthors.map(author => {
          const authorBooks = getBooksByAuthor(author.id);
          return (
            <div key={author.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm position-relative">
                <div className="position-absolute top-0 end-0 p-2">
                  <button className="btn btn-warning btn-sm" onClick={() => openEditModal(author)} title="Редактировать">
                    <Pencil />
                  </button>
                </div>
                <div className="card-body text-start pt-5">
                  <h5 className="card-title">{author.name}</h5>
                  {authorBooks.length === 0 ? (
                    <p className="text-muted">Нет книг</p>
                  ) : (
                    <ul className="list-unstyled mt-3">
                      {authorBooks.map(book => (
                        <li key={book.id} className="mb-2 d-flex justify-content-between align-items-center">
                          <span>{book.title}</span>
                          <span
                            className={`badge ${getStatusClass(book.status)} rounded-circle p-2 d-inline-flex align-items-center justify-content-center`}
                            style={{ width: '2rem', height: '2rem' }}
                            aria-label={book.status}
                          >
                            {getStatusIcon(book.status)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAuthors.length === 0 && (
        <div className="alert alert-warning text-center" role="alert">
          Авторы не найдены
        </div>
      )}

      {/* Модалки */}
      <AddAuthorModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddAuthor}
        authorName={newAuthorName}
        setAuthorName={setNewAuthorName}
      />

      <EditAuthorModal
        show={showEditModal}
        author={selectedAuthor}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditAuthor}
        editName={editAuthorName}
        setEditName={setEditAuthorName}
      />
    </div>
  );
};

export default Authors;