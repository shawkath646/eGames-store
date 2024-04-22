import getSelfOrderItems from "@/actions/database/order/getSelfOrderItems";
import moment from "moment";

export default async function OrdersContainer() {

    const orderItems = await getSelfOrderItems();

    const getStatusColorClass = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-500/30 text-green-500";
            case "cancelled":
                return "bg-red-500/30 text-red-500";
            case "holding":
                return "bg-blue-500/30 text-blue-500";
            case "pending":
                return "bg-yellow-500/30 text-yellow-500";
            default:
                return "";
        }
    };

    return (
        <section className="mt-10">
            <h1 className="text-3xl font-semibold mb-4">Orders</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {orderItems.map((item, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-6 mb-4">
                        <h2 className="text-xl font-semibold truncate">{item.title}</h2>

                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th className="py-2 pr-4 text-left text-gray-400">Status</th>
                                    <td className="py-2 px-2 text-gray-400">:</td>
                                    <td>
                                        <p className={`px-2 p-1 rounded capitalize ${getStatusColorClass(item.status.toLowerCase())} bg-gray-900`}>{item.status}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="py-2 pr-4 text-left text-gray-400">Price</th>
                                    <td className="py-2 px-2 text-gray-400">:</td>
                                    <td className="py-2 px-2 text-gray-200">৳{item.price}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 pr-4 text-left text-gray-400">Product Type</th>
                                    <td className="py-2 px-2 text-gray-400">:</td>
                                    <td className="py-2 px-2 text-gray-200 capitalize">{item.productType}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 pr-4 text-left text-gray-400">Ordered At</th>
                                    <td className="py-2 px-2 text-gray-400">:</td>
                                    <td className="py-2 px-2 text-gray-200">{moment(item.timestamp).fromNow()}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 pr-4 text-left text-gray-400">Payment Method</th>
                                    <td className="py-2 px-2 text-gray-400">:</td>
                                    <td className="py-2 px-2 text-gray-200 capitalize">{item.paymentMethod}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </section>
    );
}