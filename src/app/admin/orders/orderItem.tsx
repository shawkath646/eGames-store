import moment from 'moment';
import ButtonsContainer from './buttonsContainer';
import { OrderItemType } from "@/types/types";
import getUserById from '@/actions/database/auth/getUserById';


export default async function OrderItem({ item }: { item: OrderItemType }) {

    const userData = await getUserById(item.orderBy);

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
                return "bg-gray-500/20 text-gray-900";
        }
    };

    return (
        <article className="border border-gray-300 p-4 mb-4 shadow-lg rounded-lg">
            <table className="w-full mb-4 text-left table-auto">
                <tbody>
                    <tr className="border-b">
                        <th className="font-semibold py-3">Title</th>
                        <td className="px-2 py-3">:</td>
                        <td className="py-3">{item.title}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="font-semibold py-3">Product Type</th>
                        <td className="px-2 py-3">:</td>
                        <td className="py-3 capitalize">{item.productType}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="font-semibold py-3">Price</th>
                        <td className="px-2 py-3">:</td>
                        <td className="py-3">৳{item.price}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="font-semibold py-3">Timestamp</th>
                        <td className="px-2 py-3">:</td>
                        <td className="py-3">{moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="font-semibold py-3">Status</th>
                        <td className="px-2 py-3">:</td>
                        <td className="py-3">
                            <p className={`px-2 p-1 rounded capitalize ${getStatusColorClass(item.status.toLowerCase())} max-w-fit`}>{item.status}</p>
                        </td>
                    </tr>
                    <tr className="border-b">
                        <th className="font-semibold py-3">Email</th>
                        <td className="px-2 py-3">:</td>
                        <td className="py-3">{userData.email}</td>
                    </tr>
                    <tr>
                        <th className="font-semibold py-3">Details</th>
                        <td className="px-2 py-3">:</td>
                        <td className="py-3">{item.details}</td>
                    </tr>
                </tbody>
            </table>
            <ButtonsContainer status={item.status} orderId={item.id} />
        </article>
    );
};