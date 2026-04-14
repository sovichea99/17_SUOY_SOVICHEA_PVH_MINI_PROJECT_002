'use client'

import { useCartStore } from "@/app/store/CartStore";
import { Button } from "@heroui/react";
import React from "react";

export default function ButtonAddComponent({product}) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <Button
      isIconOnly
      aria-label="Add to cart"
      onPress={()=>addItem(product)}
      className={`size-11 rounded-full bg-lime-400 text-xl font-light text-gray-900 shadow-sm transition hover:bg-lime-300 active:scale-95}`}
    >
      +
    </Button>
  );
}
