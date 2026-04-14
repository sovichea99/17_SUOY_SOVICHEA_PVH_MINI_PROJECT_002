"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/app/store/CartStore";
import { rateProductAction } from "@/action/product.action";

export default function ProductDetailView({ product, relatedProducts }) {
    const router = useRouter();
    const addItem = useCartStore((s) => s.addItem);
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
    const [quantity, setQuantity] = useState(1);
    const [currentRating, setCurrentRating] = useState(product.star || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isPending, setIsPending] = useState(false);

    const handleAddToCart = () => {
        addItem({
            productId: product.productId,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            selectedColor,
            selectedSize,
            quantity,
        });
    };
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
    const handleProductSwitch = (newId) => {
        router.push(`/products/${newId}`);
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">

                <div className="space-y-6">
                    <div className="aspect-square bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-12 shadow-sm">
                        <Image
                            width={200}
                            height={200}
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="flex gap-4 justify-center items-center">
                        <div className="w-20 h-20 shrink-0 rounded-2xl border-2 border-blue-500 p-1 overflow-hidden shadow-md">
                            <img src={product.imageUrl} className="w-full h-full object-cover rounded-xl" alt="main" />
                        </div>

                        {relatedProducts.slice(0, 3).map((item) => (
                            <div
                                key={item.productId}
                                onClick={() => handleProductSwitch(item.productId)}
                                className="w-20 h-20 shrink-0 rounded-2xl border border-gray-100 p-1 overflow-hidden cursor-pointer opacity-60 hover:opacity-100 hover:border-blue-300 transition-all"
                            >
                                <Image width={200}
                                    height={200} src={item.imageUrl} className="w-full h-full object-contain rounded-xl" alt={item.name} />
                            </div>
                        ))}

                        {relatedProducts.length > 3 && (
                            <button className="w-10 h-10 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col pt-4">
                    <div className="mb-8">
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

                        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{product.name}</h1>

                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-blue-900">${product.price.toFixed(2)}</span>
                            <span className="text-gray-400 line-through text-lg">$299.00</span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-md">
                        {product.description}
                    </p>

                    <div className="mb-6">
                        <p className="text-sm font-semibold mb-3 text-gray-900">Choose a color</p>
                        <div className="flex gap-2">
                            {product.colors?.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-5 py-1.5 rounded-full border text-sm font-medium transition-all ${selectedColor === color ? "border-blue-600 bg-blue-50 text-blue-600 shadow-sm" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-sm font-semibold mb-3 text-gray-900">Choose a size</p>
                        <div className="flex gap-3">
                            {product.sizes?.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm font-bold transition-all ${selectedSize === size ? "border-blue-600 bg-blue-600 text-white" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 text-xl text-gray-400">−</button>
                            <span className="px-4 font-semibold min-w-[40px] text-center">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-2 text-xl text-gray-400">+</button>
                        </div>
                        <button onClick={handleAddToCart} className="flex-1 bg-[#0a1128] text-white rounded-full py-4 font-semibold hover:bg-black transition-all shadow-lg">
                            Add to cart
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4 mt-6">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400">↩</div>
                        <div>
                            <p className="font-semibold text-sm text-gray-900">Free 30-day returns</p>
                            <p className="text-xs text-gray-500">Includes 1-year limited warranty.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}