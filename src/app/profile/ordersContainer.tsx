import moment from "moment";
import getSelfOrderItems from "@/actions/database/order/getSelfOrderItems";
import { IoAlertCircle } from "react-icons/io5";

export default async function OrdersContainer() {

    const orderItems = await getSelfOrderItems();

    const getStatusColorClass = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-500/20 text-green-500";
            case "cancelled":
                return "bg-red-500/20 text-red-500";
            case "rejected":
                return "bg-red-500/20 text-red-500";
            case "received":
                return "bg-blue-500/20 text-blue-500";
            case "pending":
                return "bg-yellow-500/20 text-yellow-500";
            default:
                return "bg-gray-500/30 text-gray-400";
        }
    };


    return (
        <section className="mt-10">
            <h1 className="text-3xl font-semibold mb-4">Orders</h1>
            {!!orderItems.length ? (
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
                                            <p className={`px-2 p-1 rounded capitalize ${getStatusColorClass(item.status.toLowerCase())} max-w-fit`}>{item.status}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-2 pr-2 text-left text-gray-400">Price</th>
                                        <td className="py-2 px-2 text-gray-400">:</td>
                                        <td className="py-2 px-2 text-gray-200">৳{item.price}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-2 pr-2 text-left text-gray-400">Product Type</th>
                                        <td className="py-2 px-2 text-gray-400">:</td>
                                        <td className="py-2 px-2 text-gray-200 capitalize">{item.productType}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-2 pr-2 text-left text-gray-400">Ordered At</th>
                                        <td className="py-2 px-2 text-gray-400">:</td>
                                        <td className="py-2 px-2 text-gray-200">{moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-2 pr-2 text-left text-gray-400 whitespace-nowrap">Payment Method</th>
                                        <td className="py-2 px-2 text-gray-400">:</td>
                                        <td className="py-2 px-2 text-gray-200 capitalize">{item.paymentMethod}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center space-x-3 text-gray-300 py-14 bg-black/40 rounded">
                    <p className="font-medium text-xl">No order found</p>
                    <IoAlertCircle size={24} />
                </div>
            )}
        </section>
    );
}