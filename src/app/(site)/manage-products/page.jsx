import { getCategoriesAction, getProductsByCategoryAction } from '@/action/product.action';
import ManageProductsClient from '@/components/manage-products/ManageProductClient'
import React from 'react'

export default async function page() {
    const [products, categories] = await Promise.all([
    getProductsByCategoryAction("all"),
    getCategoriesAction(),
  ]);
  return <ManageProductsClient initialProducts={products}
      categories={categories}/>
}
