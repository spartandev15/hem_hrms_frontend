import React from "react";

interface ConfirmDialogProps {
  header?: string;
  message?: string;
  isOpen: boolean;
  onClose: (result: boolean) => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  header,
  message,
}) => {
  if (!isOpen) return null; // Don't render the dialog if not open

  return (
    <div className="confirm-dialog">
      <div>
        <div className="dialog">
          {header && (
            <h2 className="text-small text-start text-blue-primary m-0">
              {header}
            </h2>
          )}
          {message && <p className="text-small font-bold mt-3">{message}</p>}

          <div className="d-flex justify-content-end gap-2">
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
