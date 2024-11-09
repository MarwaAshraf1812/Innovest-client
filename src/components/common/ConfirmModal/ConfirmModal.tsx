import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const ConfirmModal: React.FC<ModalProps> = ({ title, message, onConfirm, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold shadow-md"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-semibold shadow-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
