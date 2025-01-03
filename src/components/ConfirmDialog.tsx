import React from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: (result: boolean) => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the dialog if not open

  return (
    <div className="confirm-dialog">
      <div>
        <div className="dialog">
          <p className="text-medium font-bold">Are you sure?</p>

          <div className="d-flex gap-2">
            <button
              className="px-4 py-1 bg-primary text-white"
              onClick={() => onClose(true)}
            >
              Yes
            </button>
            <button
              className="cancel py-1 bg-danger text-white"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
