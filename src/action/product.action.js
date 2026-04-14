"use server";

import { revalidatePath } from "next/cache";
import getProducts, { createOrder, createProduct, deleteProduct, getCategories, getOrders, getProductById, getProductsByCategory, getTopSellingProducts, rateProduct, updateProduct } from "../service/product.service";
export default async function getProductsAction() {
  const res = await getProducts();
  console.log("Products Action Result:", res);
  return res;
}
export async function getCategoriesAction() {
  const res = await getCategories();
  console.log("Categories Action Result:", res);
  return res;
}
export async function getProductByIdAction(id) {
  const res = await getProductById(id);
  console.log("Product by ID Action Result:", res);
  return res;
}
export async function getTopSellingProductsAction() {
  const res = await getTopSellingProducts();
  console.log("Top Selling Products Action Result:", res);
  
  return res || [];
}
export async function rateProductAction(productId, starValue) {
  try {
    const result = await rateProduct(productId, starValue);
    revalidatePath(`/products/${productId}`);
    
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function getProductsByCategoryAction(categoryId) {
  const products = await getProductsByCategory(categoryId);
  return products || [];
}
export async function createProductAction(formData) {
  const res = await createProduct(formData);
  return res || [];
}
export async function updateProductAction(id, formData) {
  const res = await updateProduct(id, formData);
  return res;
}
export async function deleteProductAction(id) {
  const res = await deleteProduct(id);
  return res;
}
export async function getAllOrdersAction(){
  const res = await getOrders();
  return res || [];
}
export async function createOrdersAction(data){
  const res = await createOrder({
    orderDetailRequests: data.map((item) => ({
      productId: item.productId,
      orderQty: item.quantity,
    })),
  });
  revalidatePath("/orders"); 
  return res || [];
}