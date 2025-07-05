import React from 'react';
import { X } from 'lucide-react';

const typeStyles = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
};

const Alert = ({ type = 'info', children, onClose }) => {
  return (
    <div
      className={`mb-4 px-4 py-3 rounded-md text-sm font-medium border relative ${typeStyles[type]}`}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
