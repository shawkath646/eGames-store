import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/auth";
import OrdersContainer from "@/app/profile/ordersContainer";
import NotificationsContainer from "@/app/profile/notificationsContainer";
import LogoutButton from "./logoutButton";
import getProfileQuery from "@/actions/database/getProfileQuery";
import { IoIosSettings } from "react-icons/io";
import darkBackground from "@/assets/dark-background.jpg";

export async function generateMetadata(): Promise<Metadata> {
    const session = await auth();
    return {
        title: `@${session?.user.email?.split("@")[0]}`
    }
}


export default async function Page() {

    const session = await auth();
    const profileQuery = await getProfileQuery();

    return (
        <main style={{ backgroundImage: `url(${darkBackground.src})` }} className="w-full text-white bg-gray-900 bg-cover bg-center bg-fixed">
            <div className="container mx-auto pt-28 pb-20 lg:pb-40 lg:pt-48 flex gap-5 px-5 lg:px-0">
                <div className="w-full lg:w-3/4">
                    <div className="px-4 md:flex md:space-x-6">
                        <Image src={session?.user?.image || "https://via.placeholder.com/150"} alt="Profile" height={128} width={128} className="w-32 h-32 rounded-full mx-auto md:mx-0" />
                        <div className="mb-6 my-5 lg:mt-0">
                            <h2 className="text-3xl font-semibold text-white">{session?.user.firstName} {session?.user.lastName}</h2>
                            <p className="text-gray-400">User ID: {session?.user.id}</p>
                            <p className="text-gray-400">Email: {session?.user.email}</p>
                            <div className="flex items-center space-x-3">
                                {(session?.user.role === "admin" || session?.user.role === "moderator") && (
                                    <Link href="/admin" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4 py-1.5 px-4 rounded focus:outline-none flex items-center space-x-2 transition-colors">
                                        <p>Tools</p>
                                        <IoIosSettings size={20} />
                                    </Link>
                                )}
                                <LogoutButton />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-md p-4 mt-4 max-w-xl">
                        <p className="text-white text-lg font-semibold mb-2">Orders Summary</p>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-gray-400">Active orders:</p>
                                <p className="text-xl font-semibold text-white">{profileQuery.activeOrders}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Completed orders:</p>
                                <p className="text-xl font-semibold text-white">{profileQuery.completedOrders}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Total spent:</p>
                                <p className="text-xl font-semibold text-white">৳{profileQuery.totalSpent}</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden block lg:w-1/4 mt-10">
                        <NotificationsContainer />
                    </div>
                    <OrdersContainer />
                </div>
                <div className="hidden lg:block lg:w-1/4">
                    <NotificationsContainer />
                </div>
            </div>
        </main>
    );
}