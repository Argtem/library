import { useState, useEffect, useCallback } from 'react';
import FilterAuthors from './Filter';
import AddAuthorModal from './components/AddAuthorModal';
import EditAuthorModal from './components/EditAuthorModal';
import { Author, Book, getAuthors, createAuthor, updateAuthor } from '@/services/api';
import { Book as BookIcon, BookHalf, CheckCircle, Pencil, Plus } from 'react-bootstrap-icons';

const Authors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const [newAuthorName, setNewAuthorName] = useState('');
  const [editAuthorName, setEditAuthorName] = useState('');

  const loadAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAuthors(searchText);
      setAuthors(data);
    } catch (error) {
      console.error('Failed to load authors:', error);
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    loadAuthors();
  }, [loadAuthors]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'В плане': return <BookIcon />;
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

  const handleAddAuthor = async (name: string) => {
    try {
      const newAuthor = await createAuthor(name);
      setAuthors(prev => [...prev, newAuthor]);
      setNewAuthorName('');
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add author:', error);
      alert('Не удалось добавить автора');
    }
  };

  const handleEditAuthor = async (updatedAuthor: Author) => {
    try {
      const result = await updateAuthor(updatedAuthor.id, updatedAuthor.name);
      setAuthors(prev => prev.map(a => a.id === result.id ? result : a));
      setShowEditModal(false);
      setSelectedAuthor(null);
    } catch (error) {
      console.error('Failed to update author:', error);
      alert('Не удалось обновить автора');
    }
  };

  const openEditModal = (author: Author) => {
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

      {loading && <div className="text-center">Загрузка...</div>}

      <div className="row">
        {!loading && authors.map(author => {
          const authorBooks = author.books || [];
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

      {!loading && authors.length === 0 && (
        <div className="alert alert-warning text-center">Авторы не найдены</div>
      )}

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