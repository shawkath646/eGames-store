import moment from 'moment';
import FilterMenu from './filterMenu';
import ButtonsContainer from './buttonsContainer';
import getAllOrders from "@/actions/database/admin/getAllOrders";
import { IoWallet, IoAlertCircle } from "react-icons/io5";


export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    let allOrders = await getAllOrders();

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

    let filterBy = searchParams.filter;
    if (Array.isArray(filterBy)) filterBy = filterBy[0];

    if (filterBy && filterBy !== "all") {
        allOrders = allOrders.filter(item => item.status === filterBy && item.status !== "completed");
    } else {
        allOrders = allOrders.filter(item => item.status !== "completed");
    }

    return (
        <main className="min-h-[700px] w-full bg-white text-black">
            <div className="container mx-auto pt-28 pb-20 px-5 lg:px-0">
                <div className="flex items-center justify-center space-x-3 text-blue-500">
                    <IoWallet size={24} />
                    <p className="text-2xl font-semibold text-center">Payments</p>
                </div>
                <FilterMenu currentItem={filterBy} />

                {!!allOrders.length ? (
                    <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allOrders.map((item, index) => (
                            <article key={index} className="border border-gray-300 p-4 mb-4 shadow-lg rounded-lg">
                                <table className="w-full mb-4 text-left capitalize">
                                    <tbody>
                                        <tr className="border-b">
                                            <th className="font-semibold py-3">Payment Method</th>
                                            <td className="px-2 py-3">:</td>
                                            <td className="py-3">{item.paymentMethod}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="font-semibold py-3">Amount</th>
                                            <td className="px-2 py-3">:</td>
                                            <td className="py-3">৳{item.price}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="font-semibold py-3">Transaction ID</th>
                                            <td className="px-2 py-3">:</td>
                                            <td className="py-3">{item.transactionId}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="font-semibold py-3">Last 4 digit</th>
                                            <td className="px-2 py-3">:</td>
                                            <td className="py-3">{item.accountLast4Digit}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="font-semibold py-3">Timestamp</th>
                                            <td className="px-2 py-3">:</td>
                                            <td className="py-3">{moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                        </tr>
                                        <tr>
                                            <th className="font-semibold py-3">Status</th>
                                            <td className="px-2 py-3">:</td>
                                            <td className="py-3">
                                                <p className={`px-2 p-1 rounded capitalize ${getStatusColorClass(item.status.toLowerCase())} max-w-fit`}>{item.status}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <ButtonsContainer status={item.status} orderId={item.id} />
                            </article>
                        ))}
                    </section>
                ) : (
                    <section className="h-[500px] w-full flex items-center justify-center text-gray-800 space-x-3">
                        <p className="font-medium text-xl">No payment found</p>
                        <IoAlertCircle size={24} />
                    </section>
                )}
            </div>
        </main>
    );
}