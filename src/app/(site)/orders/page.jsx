import { getAllOrdersAction } from '@/action/product.action'
import OrderCard from '@/components/orders/OrderCard';
import React from 'react'

export default async function Page() {
    const orders = await getAllOrdersAction();

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-900">Ordered products</h1>
                <p className="mt-1 text-sm text-gray-500">
                    {orders.length} {orders.length === 1 ? "order" : "orders"} from your account.
                </p>

                <div className="mt-8 flex flex-col gap-5">
                    {orders.length === 0 ? (
                        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                            <p className="text-gray-400">No orders yet.</p>
                        </div>
                    ) : (
                        orders
                            ?.slice()
                            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                            .map((order) => (
                                <OrderCard key={order.orderId} order={order} />
                            ))
                    )}
                </div>
            </div>
        </div>
    );
}
