import getProductsAction, { getProductByIdAction } from "@/action/product.action";
import ProductDetailView from "../../../../components/products/ProductDetailComponent";

export default async function Page({ params }) {
    const { id } = await params;
    
    const productRes = await getProductByIdAction(id);
    const allProductsRes = await getProductsAction();

    const product = productRes?.payload || productRes;
    const allItems = allProductsRes?.payload || allProductsRes || [];
    
    // Filter related products
    const related = allItems.filter(
        (p) => p.categoryId === product.categoryId && p.productId !== product.productId
    );

    return <ProductDetailView product={product} relatedProducts={related} />;
}