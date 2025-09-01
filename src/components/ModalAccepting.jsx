

import React from "react";

export default function ModalAccepting({
  message,
  children,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">{message}</h2>
        {children && <div className="modal-content">{children}</div>}
        <div className="modal-actions">
          {cancelText && (
            <button className="modal-btn cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className="modal-btn confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}