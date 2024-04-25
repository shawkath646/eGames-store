import Link from "next/link";
import Image from "next/image";
import getAllCounts from "@/actions/database/admin/getAllCounts";
import { IoWallet, IoBag, IoPerson, IoSettings } from "react-icons/io5";
import eGamesStoreIcon from "@/assets/eGames-shop_icon_500x500.png";

export default async function Page() {

    const allCounts = await getAllCounts();

    return (
        <main className="min-h-[700px] w-full bg-white text-black">
            <div className="container mx-auto pt-28 pb-20 lg:pb-40 lg:pt-48 px-5 lg:px-0">
                <div className="flex items-center justify-center space-x-3">
                    <Image src={eGamesStoreIcon} alt="eGames store icon" height={30} width={30} />
                    <p className="text-2xl font-semibold text-center">eGames store</p>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    <Link href="/admin/payments" className="flex items-center justify-center p-4 text-center bg-blue-500 text-white rounded-md transition duration-300 transform hover:scale-105 relative">
                        <IoWallet size={24} className="mr-2" />
                        <p>Payments</p>
                        {!!allCounts.payments && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{allCounts.payments > 9 ? "9+" : allCounts.payments}</span>
                        )}
                    </Link>
                    <Link href="/admin/orders" className="flex items-center justify-center p-4 text-center bg-green-500 text-white rounded-md transition duration-300 transform hover:scale-105 relative">
                        <IoBag size={24} className="mr-2" />
                        <p>Orders</p>
                        {!!allCounts.orders && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{allCounts.orders > 9 ? "9+" : allCounts.orders}</span>
                        )}
                    </Link>
                    <Link href="/admin/users" className="flex items-center justify-center p-4 text-center bg-yellow-500 text-white rounded-md transition duration-300 transform hover:scale-105">
                        <IoPerson size={24} className="mr-2" />
                        <p>Users</p>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center justify-center p-4 text-center bg-purple-500 text-white rounded-md transition duration-300 transform hover:scale-105">
                        <IoSettings size={24} className="mr-2" />
                        <p>Settings</p>
                    </Link>
                </section>

            </div>
        </main>
    );
}