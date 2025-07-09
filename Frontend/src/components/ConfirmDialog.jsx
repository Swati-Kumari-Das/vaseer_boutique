// components/ConfirmDialog.jsx
import { X } from "lucide-react";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onCancel}
        >
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold text-[#6D2932] mb-4">{message}</h3>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#6D2932] text-white rounded hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
