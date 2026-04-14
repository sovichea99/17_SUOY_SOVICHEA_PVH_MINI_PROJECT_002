import CartClientComponent from '@/components/cart/CartClientComponent';
import React from 'react'
import {createOrdersAction} from '@/action/product.action'

export default function page() {
   return <CartClientComponent  createOrder={createOrdersAction}/>;
}
