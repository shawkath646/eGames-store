"use client";
import { signOut } from "next-auth/react";
import { IoMdExit } from "react-icons/io";

export default function LogoutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: "/" })} className="bg-red-600 hover:bg-red-700 text-white font-semibold mt-4 py-1.5 px-4 rounded focus:outline-none flex items-center space-x-2 transition-colors">
            <p>Logout</p>
            <IoMdExit size={20} />
        </button>
    );
}