"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { createProductAction, deleteProductAction, updateProductAction } from "@/action/product.action";

export default function ManageProductsClient({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts);
  const [sort, setSort] = useState("name-asc");
  const [modal, setModal] = useState(null); // null | { type: "create" | "edit", product? }
  const [deleteId, setDeleteId] = useState(null);

  const sorted = [...products].sort((a, b) => {
    if (sort === "name-asc") return (a.name ?? "").localeCompare(b.name ?? "");
    if (sort === "name-desc") return (b.name ?? "").localeCompare(a.name ?? "");
    return 0;
  });

  const handleSave = async (form) => {
  if (modal?.type === "edit") {
    const updated = await updateProductAction(modal.product.productId, form);
    if (updated) {
      setProducts((prev) =>
        prev.map((p) => p.productId === updated.productId ? updated : p)
      );
    }
  } else {
    const created = await createProductAction(form);
    if (created) {
      setProducts((prev) => [...prev, created]);
    }
  }
  setModal(null);
};

  const handleDelete = async () => {
   const deleted = await deleteProductAction(deleteId);
   if(deleted) {
     setProducts((prev) => prev.filter((p) => p.productId !== deleteId));
   }
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Create, update, and delete products in this demo (local state only).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-300"
            >
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
            </select>
          </div>
        </div>

        {/* Products card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900">Products</h2>
            <button
              onClick={() => setModal({ type: "create" })}
              className="flex items-center gap-1.5 rounded-full bg-lime-400 px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-lime-300 transition shadow-sm"
            >
              <span className="text-lg leading-none">+</span> Create product
            </button>
          </div>

          {sorted.length === 0 ? (
            <p className="text-center py-16 text-gray-400">No products yet. Create one!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  onEdit={(p) => setModal({ type: "edit", product: p })}
                  onDelete={(id) => setDeleteId(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {modal && (
        <ProductModal
          initial={modal.type === "edit" ? {
            ...modal.product,
            colors: Array.isArray(modal.product.colors) ? modal.product.colors.join(", ") : modal.product.colors,
            sizes: Array.isArray(modal.product.sizes) ? modal.product.sizes.join(", ") : modal.product.sizes,
          } : null}
          categories={categories}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteId && (
        <DeleteProductModal
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}