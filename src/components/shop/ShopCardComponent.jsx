"use client";

import { rateProductAction } from "@/action/product.action";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function ProductCardComponent({ product }) {
  const { productId, name, imageUrl, price, category, description } = product;
  const [currentRating, setCurrentRating] = useState(product.star || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const handleStarClick = async (rating) => {
    const previousRating = currentRating;

    setCurrentRating(rating);
    setIsPending(true);

    const result = await rateProductAction(product.productId, rating);

    if (!result.success) {
      setCurrentRating(previousRating);
      console.error(`Rating failed: ${result.error}`);
    }

    setIsPending(false);
  };

  const getValidImageUrl = (url) => {
    if (!url) return "/placeholder.png";

    if (url === "string" || url.length < 5) {
      return "/placeholder.png";
    }

    if (url.startsWith("http") || url.startsWith("data:image")) {
      return url;
    }

    return "/placeholder.png";
  };
  const validSrc = getValidImageUrl(imageUrl);
  return (
    <article className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col">
      <Link href={`/products/${productId}`} className="block">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {imageUrl ? (
            <Image
              src={validSrc}
              alt={name ?? "Product image"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover hover:scale-[1.02] transition"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-gray-300 text-4xl">◇</div>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${productId}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug hover:text-lime-700 line-clamp-1">
            {name}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onMouseEnter={() => setHoverRating(num)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleStarClick(num)}
                className="text-2xl transition-all cursor-pointer"
              >
                <span className={
                  (hoverRating || currentRating) >= num
                    ? "text-yellow-400"
                    : "text-gray-300"
                }>
                  ★
                </span>
              </button>
            ))}
          </div>
          <span className="text-gray-400 text-xs">
            {currentRating}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-gray-900">${price}</span>
          {category?.name && (
            <span className="text-xs text-blue-700 p-1 rounded-lg bg-blue-50 font-medium uppercase tracking-wider">
              {category.name}
            </span>
          )}
        </div>
        <Link href={`/products/${productId}`}>
          <button className="mt-3 w-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 rounded-xl transition">
            View Product
          </button>
        </Link>
      </div>
    </article>
  );
}