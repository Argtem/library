interface DeleteConfirmModalProps {
  show: boolean;
  bookTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ show, bookTitle, onClose, onConfirm }: DeleteConfirmModalProps) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Подтверждение удаления</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Закрыть" />
          </div>
          <div className="modal-body">
            <p>Вы действительно хотите удалить книгу <strong>"{bookTitle}"</strong>?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Отменить</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;