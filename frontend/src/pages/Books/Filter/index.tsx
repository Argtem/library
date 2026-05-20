import type { IAuthor } from '../types.ts';
import styles from './filterBooks.module.css';

interface FilterBooksProps {
  authors: IAuthor[];
  searchText: string;
  onSearchChange: (value: string) => void;
  selectedAuthorId: number | '';
  onAuthorChange: (value: number | '') => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
}

const statusOptions: string[] = ['В плане', 'Читаю', 'Прочел'];

const FilterBooks = ({
  authors,
  searchText,
  onSearchChange,
  selectedAuthorId,
  onAuthorChange,
  selectedStatus,
  onStatusChange,
}: FilterBooksProps) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleAuthorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onAuthorChange(value === '' ? '' : Number(value));
  };

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value);
  };

  const showError = searchText.length > 0 && searchText.length < 3;

  return (
    <div className="row g-3 mb-4 align-items-end">
      <div className="col-md-4">
        <label htmlFor="searchInput" className="form-label">Поиск по названию</label>
        <input
          type="text"
          className={`form-control ${showError ? 'is-invalid' : ''}`}
          id="searchInput"
          placeholder="Введите название книги"
          value={searchText}
          onChange={handleSearchInput}
        />
        {showError && <div className="invalid-feedback">Введите не менее трех символов</div>}
      </div>

      <div className="col-md-4">
        <label htmlFor="authorSelect" className="form-label">Поиск по автору</label>
        <select
          id="authorSelect"
          className="form-select"
          value={selectedAuthorId}
          onChange={handleAuthorSelect}
        >
          <option value="">Все авторы</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label htmlFor="statusSelect" className="form-label">Поиск по статусу</label>
        <select
          id="statusSelect"
          className="form-select"
          value={selectedStatus}
          onChange={handleStatusSelect}
        >
          <option value="">Все статусы</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBooks;