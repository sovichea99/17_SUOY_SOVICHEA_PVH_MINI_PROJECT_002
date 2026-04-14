"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const COLOR_OPTIONS = ["green", "gray", "red", "blue", "white", "black", "pink", "yellow"];
const SIZE_OPTIONS  = ["s", "m", "l", "xl", "xxl", "xxxl"];


const schema = z.object({
  name:        z.string().min(1, "Name is required"),
  price:       z.coerce.number({ invalid_type_error: "Price must be a number" }).positive("Price must be greater than 0"),
  categoryId:  z.string().min(1, "Category is required"),
  imageUrl:    z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  description: z.string().optional(),
  colors:      z.array(z.string()).min(1, "Select at least one color"),
  sizes:       z.array(z.string()).min(1, "Select at least one size"),
});

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

export default function ProductModal({ initial, categories, onClose, onSave }) {
  const isEdit = !!initial;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name:        initial?.name        ?? "",
      price:       initial?.price       ?? "",
      description: initial?.description ?? "",
      imageUrl:    initial?.imageUrl    ?? "",
      categoryId:  initial?.categoryId  ?? "",
      colors:      toArray(initial?.colors),
      sizes:       toArray(initial?.sizes),
    },
  });

  function onSubmit(data) {
    onSave(data);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-6 pb-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Edit product" : "Create product"}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Fill in the details below to {isEdit ? "update" : "create"} a product.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition text-lg"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-8 pb-4 flex flex-col gap-3">

            {/* Name + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                <input
                  {...register("name")}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  placeholder="e.g. Tea-Trica BHA Foam"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Price</label>
                <input
                  type="number"
                  {...register("price")}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  placeholder="e.g. 62"
                />
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
                )}
              </div>
            </div>

            {/* Category + Image URL */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                <div className="relative">
                  <select
                    {...register("categoryId")}
                    className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-300 bg-white"
                  >
                    <option value="">Select...</option>
                    {categories.map((c) => (
                      <option key={c.categoryId} value={c.categoryId}>{c.name}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                </div>
                {errors.categoryId && (
                  <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Image URL (optional)</label>
                <input
                  {...register("imageUrl")}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  placeholder="https://..."
                />
                {errors.imageUrl && (
                  <p className="text-xs text-red-500 mt-1">{errors.imageUrl.message}</p>
                )}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Colors</label>
              <Controller
                name="colors"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.map((color) => {
                      const isActive = field.value.includes(color);
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            const next = isActive
                              ? field.value.filter((c) => c !== color)
                              : [...field.value, color];
                            field.onChange(next);
                          }}
                          className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition ${
                            isActive
                              ? "border-blue-500 text-gray-900"
                              : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span className={`size-3 rounded-full border flex items-center justify-center ${
                            isActive ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}>
                            {isActive && (
                              <svg className="size-2 text-white" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {color}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.colors && (
                <p className="text-xs text-red-500 mt-1">{errors.colors.message}</p>
              )}
            </div>

            {/* Sizes */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Sizes</label>
              <Controller
                name="sizes"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {SIZE_OPTIONS.map((size) => {
                      const isActive = field.value.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            const next = isActive
                              ? field.value.filter((s) => s !== size)
                              : [...field.value, size];
                            field.onChange(next);
                          }}
                          className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition ${
                            isActive
                              ? "border-blue-500 text-gray-900"
                              : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span className={`size-3 rounded-full border flex items-center justify-center ${
                            isActive ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}>
                            {isActive && (
                              <svg className="size-2 text-white" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {size}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.sizes && (
                <p className="text-xs text-red-500 mt-1">{errors.sizes.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-300 resize-none"
                placeholder="Short description shown on the product card..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-8 py-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-200 px-7 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-lime-400 px-7 py-2.5 text-sm font-semibold text-gray-900 hover:bg-lime-300 transition"
            >
              {isEdit ? "Save changes" : "Create product"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}