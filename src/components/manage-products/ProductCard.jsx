"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ButtonAddComponent from "../ButtonAddComponent";

export function StarRow({ rating }) {
  const rounded = Math.round(rating ?? 0);
  return (
    <p className="flex items-center gap-0.5 text-amber-400 text-sm">
      {"★".repeat(rounded)}
      <span className="text-gray-300">{"★".repeat(5 - rounded)}</span>
      <span className="ml-1 text-xs text-gray-400">{rating ?? "—"}</span>
    </p>
  );
}

function getValidImageUrl(url) {
  if (!url || url === "string" || url.length < 5) return "/placeholder.png";
  if (url.startsWith("http") || url.startsWith("data:image")) return url;
  return "/placeholder.png";
}

export default function ProductCard({ product, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { productId, name, imageUrl, price, star } = product;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article className="relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* 3-dot menu */}
      <div className="absolute top-3 right-3 z-10" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition"
        >
          ···
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-10 w-36 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
            <button
              onClick={() => { setMenuOpen(false); onEdit(product); }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => { setMenuOpen(false); onDelete(productId); }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
        <Image
          src={getValidImageUrl(imageUrl)}
          alt={name || "Product"}
          fill
          className="object-cover"
        />
      </div>

      <StarRow rating={star} />
      <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-1">{name}</h3>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-semibold text-gray-900">${price}</span>
        <ButtonAddComponent product={product} />
      </div>
    </article>
  );
}