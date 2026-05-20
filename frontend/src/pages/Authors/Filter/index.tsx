interface FilterAuthorsProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

const FilterAuthors = ({ searchText, onSearchChange }: FilterAuthorsProps) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const showError = searchText.length > 0 && searchText.length < 3;

  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <label htmlFor="authorSearch" className="form-label">
          Поиск авторов
        </label>
        <input
          type="text"
          className={`form-control ${showError ? 'is-invalid' : ''}`}
          id="authorSearch"
          placeholder="Введите имя автора не менее 3 символов"
          value={searchText}
          onChange={handleSearchInput}
        />
        {showError && (
          <div className="invalid-feedback">Введите не менее трех символов</div>
        )}
      </div>
    </div>
  );
};

export default FilterAuthors;