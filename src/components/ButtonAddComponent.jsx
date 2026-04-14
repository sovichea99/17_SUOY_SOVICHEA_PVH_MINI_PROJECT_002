'use client'

import { useCartStore } from "@/app/store/CartStore";
import { Button } from "@heroui/react";
import React from "react";
import { sileo } from "sileo";

export default function ButtonAddComponent({product}) {
  const addItem = useCartStore((s) => s.addItem);
  const handleAddToCart = (e) => {
    
    addItem(product);
    
    sileo.success({
      title: "Added To Cart",
      description: `${product.name} is in your cart`,
      fill: "#171717",
      position: "top-right",
      styles: {
        title: "text-white!",
        description: "text-white/75!",
      },
    });
  }
  return (
    <Button
      isIconOnly
      aria-label="Add to cart"
      onPress={()=>handleAddToCart(product)}
      className={`size-11 rounded-full bg-lime-400 text-xl font-light text-gray-900 shadow-sm transition hover:bg-lime-300 active:scale-95}`}
    >
      +
    </Button>
  );
}
