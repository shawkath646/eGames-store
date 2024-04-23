
import FilterMenu from './filterMenu';

import getAllOrders from "@/actions/database/admin/getAllOrders";
import { IoBag, IoAlertCircle } from "react-icons/io5";
import OrderItem from './orderItem';


export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    let allOrders = await getAllOrders();

    let filterBy = searchParams.filter;
    if (Array.isArray(filterBy)) filterBy = filterBy[0];

    if (filterBy && filterBy !== "all") {
        allOrders = allOrders.filter(item => item.status !== "pending" && item.status !== "rejected" && item.status === filterBy);
    } else {
        allOrders = allOrders.filter(item => item.status !== "pending" && item.status !== "rejected");
    }

    return (
        <main className="min-h-[700px] w-full bg-white text-black">
            <div className="container mx-auto pt-28 pb-20 px-5 lg:px-0">
                <div className="flex items-center justify-center space-x-3 text-blue-500">
                    <IoBag size={24} />
                    <p className="text-2xl font-semibold text-center">Orders</p>
                </div>
                <FilterMenu currentItem={filterBy} />

                {!!allOrders.length ? (
                    <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allOrders.map((item, index) => (
                            <OrderItem key={index} item={item} />
                        ))}
                    </section>
                ) : (
                    <section className="h-[500px] w-full flex items-center justify-center text-gray-800 space-x-3">
                        <p className="font-medium text-xl">No order found</p>
                        <IoAlertCircle size={24} />
                    </section>
                )}
            </div>
        </main>
    );
}