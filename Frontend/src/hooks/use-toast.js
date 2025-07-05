
// src/hooks/use-toast.js
import { useState } from 'react';

export const useToast = () => {
  const [message, setMessage] = useState(null);

  const toast = ({ title, description, variant = "default" }) => {
    alert(`${title}\n${description}`);
  };

  return { toast };
};
