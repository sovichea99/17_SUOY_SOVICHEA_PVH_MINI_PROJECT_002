"use client";

export default function DeleteProductModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold text-gray-900">Delete product?</h3>
        <p className="mt-2 text-sm text-gray-400">This action cannot be undone.</p>
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onClose}
            className="rounded-full border border-gray-200 px-4 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full bg-red-500 px-4 py-1 text-sm font-semibold text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}