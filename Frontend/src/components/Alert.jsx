import React from 'react';

const typeStyles = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
};

const Alert = ({ type = 'info', children }) => {
  return (
    <div
      className={`mb-4 px-4 py-3 rounded-md text-sm font-medium border ${typeStyles[type]}`}
    >
      {children}
    </div>
  );
};

export default Alert;
