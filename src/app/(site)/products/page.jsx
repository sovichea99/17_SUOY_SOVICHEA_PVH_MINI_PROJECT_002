import ProductComponent from "../../../components/products/ProductComponent";
import getProductsAction, { getCategoriesAction } from "../../../action/product.action";


export default async function Page() {
  const [products, categories] = await Promise.all([
    getProductsAction(),
    getCategoriesAction(),
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Luxury beauty products</h1>
          <p className="text-gray-500 mt-1">Use the filters to narrow by price and brand.</p>
        </div>

        <ProductComponent products={products} categories={categories} />
      </div>
    </div>
  );
}