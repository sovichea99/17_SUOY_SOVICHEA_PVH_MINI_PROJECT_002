"use client";

import { useState } from "react";
import ShopCardComponent from "../shop/ShopCardComponent";

export default function ProductComponent({ products, categories }) {
    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState(300);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const resetFilters = () => {
        setSearch("");
        setMaxPrice(300);
        setSelectedCategories([]);
    };

    const filtered = products.filter((p) => {
        const matchSearch = (p.name ?? "").toLowerCase().includes(search.toLowerCase());
        const matchPrice = Number(p.price) <= maxPrice;
        const matchCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(p.categoryId);
        return matchSearch && matchPrice && matchCategory;
    });

    return (
        <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-64 shrink-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-800">Filters</span>
                        <button
                            onClick={resetFilters}
                            className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50"
                        >
                            Reset filters
                        </button>
                    </div>

                    {/* Price Range */}
                    <div className="mb-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Price Range</p>
                        <p className="text-sm text-gray-600 mb-2">
                            $0 – ${maxPrice}{" "}
                            <span className="text-gray-400">{maxPrice === 500 ? "(no limit)" : ""}</span>
                        </p>
                        <input
                            type="range"
                            min="0"
                            max="300"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full accent-gray-800"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>$0</span><span>$300</span>
                        </div>
                    </div>

                    {/* Quick Select */}
                    <div className="mb-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Quick Select</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Under $50", value: 50 },
                                { label: "Under $100", value: 100 },
                                { label: "Under $150", value: 150 },
                                { label: "All prices", value: 300 },
                            ].map(({ label, value }) => (
                                <button
                                    key={label}
                                    onClick={() => setMaxPrice(value)}
                                    className={`text-xs border rounded-lg px-2 py-1.5 transition ${maxPrice === value
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Categories</p>
                        {categories.map((cat) => {
                            const count = products.filter((p) => p.categoryId === cat.categoryId).length;
                            return (
                                <label key={cat.categoryId} className="flex items-center justify-between cursor-pointer mb-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            checked={selectedCategories.includes(cat.categoryId)}
                                            onChange={() => toggleCategory(cat.categoryId)}
                                        />
                                        <span className="text-sm text-gray-700 capitalize">{cat.name}</span>
                                    </div>
                                    <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{count}</span>
                                </label>
                            );
                        })}
                        <p className="text-xs text-gray-400 mt-2">Select none to include all categories.</p>
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-800">{filtered.length}</span> products
                        {products.length > 0 && <span className="text-gray-400 ml-1">(of {products.length})</span>}
                    </p>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by product name..."
                        className="w-64 px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-lime-300"
                    />
                </div>

                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((product) => (
                            <ShopCardComponent key={product.productId} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="border border-gray-200 border-dashed rounded-2xl bg-white p-20 flex flex-col items-center justify-center text-center">
                        <p className="font-semibold text-gray-900 mb-2">
                            No products match these filters
                        </p>

                        <p className="text-sm text-gray-500 mb-6 max-w-sm">
                            Try raising the price limit or clearing category filters.
                        </p>

                        <button
                            onClick={resetFilters}
                            className="text-sm px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}