"use client";

import Image from "next/image";
import Link from "next/link";
import ButtonAddComponent from "./ButtonAddComponent";

export function StarRow({ rating = 4.8 }) {
  return (
    <p className="flex items-center gap-0.5 text-amber-400">
      {/* Dynamic stars based on rating */}
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      <span className="ml-1 text-xs text-gray-400">{rating}</span>
    </p>
  );
}

export default function ProductCardComponent({ product }) {
  const { productId, name, imageUrl, price, category, description } = product;

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
    <article className="group relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      <Link href={`/products/${productId}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          {imageUrl ? (
            <Image
              src={validSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-linear-to-br from-gray-100 to-lime-50/30 text-gray-400">
              ◇
            </div>
          )}
        </div>
      </Link>
      <div className="relative mt-4 pr-14">
        <StarRow />
        <Link href={`/products/${productId}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 hover:text-lime-700">
            {name}
          </h3>
        </Link>
        <p className="mt-2 text-base font-semibold tabular-nums text-gray-900">${price}</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <ButtonAddComponent product={product} />
      </div>
    </article>
  );
}