"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import {
  filterProductsByEssentialsTab,
} from "../../data/mockData";
import ProductCardComponent from "../ProductCardComponent";
import { getCategoriesAction, getProductsByCategoryAction } from "@/action/product.action";

const PAGE_SIZE = 8;

export default function LandingEssentialsGrid() {
  const [categories, setCategories] = useState([{ id: "all", name: "All" }]);
  const [activeTabId, setActiveTabId] = useState("all");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function loadTabs() {
      const data = await getCategoriesAction();
      setCategories([{ id: "all", name: "All" }, ...data]);
    }
    loadTabs();
  }, []);
  useEffect(() => {
    async function fetchNewProducts() {
      setIsLoading(true);
      try {
         const data = await getProductsByCategoryAction(activeTabId);
        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNewProducts();
  }, [activeTabId]);

  const visible = showAll ? products : products.slice(0, PAGE_SIZE);
  const canLoadMore = !showAll && products.length > PAGE_SIZE;

  return (
    <section id="shop" className="mx-auto w-full max-w-7xl py-16 lg:py-20">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Our skincare essentials
        </h2>
        <p className="mt-2 max-w-lg text-gray-500">
          Filter by routine step — same mock catalog, organized for quick discovery.
        </p>
      </div>

      <div
        className="mt-10 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Product categories"
      >
        {categories.map((category) => {
          const isSelected = activeTabId === (category.categoryId || "all");
          return (
            <Button
              role="tab"
              aria-selected={isSelected}
              key={category.categoryId || "all"}
              onPress={() => {

                setActiveTabId(category.categoryId || "all");
                setShowAll(false);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${isSelected
                  ? "bg-lime-400 text-gray-900 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {category.name}
            </Button>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {visible.map((product, index) => (
         <ProductCardComponent product={product} key={product.productId || product.id} />
        ))}
      </div>


      {canLoadMore && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="secondary"
            onPress={() => setShowAll(true)}
            className="rounded-full border border-gray-200 bg-white px-10 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
