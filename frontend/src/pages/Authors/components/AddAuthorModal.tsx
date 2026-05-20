interface AddAuthorModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  authorName: string;
  setAuthorName: (val: string) => void;
}

const AddAuthorModal = ({ show, onClose, onSave, authorName, setAuthorName }: AddAuthorModalProps) => {
  if (!show) return null;

  const handleSave = () => {
    if (!authorName.trim()) {
      alert('Введите имя автора');
      return;
    }
    onSave(authorName);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Добавить нового автора</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Закрыть" />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="authorName" className="form-label">Имя автора *</label>
              <input
                type="text"
                className="form-control"
                id="authorName"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                required
              />
            </div>
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

export default AddAuthorModal;