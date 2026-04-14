export default function OrderCard({ order }) {
    const total = order.totalAmount ?? 0;

    const orderDate = order.orderDate
        ? new Date(order.orderDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "—";

    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {/* Order header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-50">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Order</p>
                    <p className="mt-1 font-mono text-base font-semibold text-gray-900">
                        #{order.orderId}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                        ${total.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Order meta */}
            <div className="px-6 py-4 bg-gray-50/50 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-400">User ID</p>
                        <p className="mt-0.5 text-sm text-gray-700 font-mono truncate">
                            {order.appUserId ?? "—"}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Order date</p>
                        <p className="mt-0.5 text-sm text-gray-700">{orderDate}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Line items</p>
                    <p className="mt-0.5 text-sm text-gray-700">
                        {order.orderDetailsResponse?.length ?? 0}
                    </p>
                </div>
            </div>

            {/* Order details */}
            <div className="px-6 py-4">
                <div className="bg-gray-100 px-2 py-2 rounded-lg">
                   
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                     <p className="text-xs mx-1 font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Order Details
                </p>
                    {order.orderDetailsResponse?.map((detail, i) => (
                        <div
                            key={detail.productId ?? i}
                            className={`flex items-center justify-between px-4 py-3 text-sm ${i !== 0 ? "border-t border-gray-100" : ""
                                }`}
                        >
                            <span className="text-gray-600">
                                Product <span className="font-semibold text-gray-900">{detail.productName}</span>
                            </span>
                            <span className="text-gray-400 mx-4">Qty {detail.orderQty}</span>
                            <span className="font-semibold text-gray-900">
                                ${detail.orderTotal?.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
                </div>
                
            </div>
        </div>
    );
}