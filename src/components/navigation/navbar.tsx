import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/auth";
import NavbarNotificationMenu from "./navbarNotificationMenu";
import jwt from "jsonwebtoken";
import { FetchedNotificationQuery } from "@/types/types";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import eGamesStoreIcon from "@/assets/eGames-shop_icon_500x500.png";

export default async function Navbar() {

    const session = await auth();

    const authorizationToken = jwt.sign({}, process.env.SHAS_APP_SECRET as string, { expiresIn: "30s" });

    const fetchNotifications = await fetch(`${process.env.APP_BASE_URL}/api/navbar-notification?userId=${session?.user.id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${authorizationToken}`
        },
        next: { tags: ["navbarNotification"] }
    });

    const notificationsQuery = await fetchNotifications.json() as FetchedNotificationQuery;

    return (
        <nav className="fixed inset-0 w-full h-fit bg-gradient-to-r from-purple-800 to-indigo-800 shadow-xl z-[999]">
            <div className="container mx-auto py-4 flex items-center justify-between px-5 lg:px-0">
                <Link href="/" className="flex items-center justify-center space-x-2">
                    <Image src={eGamesStoreIcon} alt="eGames store icon" height={40} width={40} />
                    <p className="font-semibold text-lg text-white">eGames store</p>
                </Link>
                <div className="flex items-center justify-center space-x-2 md:space-x-5">
                    {session ? (
                        <>
                            <NavbarNotificationMenu notificationsQuery={notificationsQuery} />
                            <Link href="/profile">
                                <FaUserCircle size={25} className="text-gray-300 hover:text-white transition-colors" />
                            </Link>
                            {(session.user.role === "admin" || session.user.role === "moderator") && (
                                <Link href="/admin">
                                    <IoIosSettings size={25} className="text-gray-300 hover:text-white transition-colors" />
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" className="text-sm text-gray-200 hover:text-white transition-colors">
                                Sign In
                            </Link>
                            <p className="text-gray-200">|</p>
                            <Link href="/sign-up" className="text-sm text-gray-200 hover:text-white transition-colors">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}