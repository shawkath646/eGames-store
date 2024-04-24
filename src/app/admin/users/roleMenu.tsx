"use client";
import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown } from "react-icons/fa";
import setUserRole from '@/actions/database/admin/users/setUserRole';


export default function RoleMenu({ currentItem, userId }: { currentItem: string; userId: string; }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center w-full rounded-md border shadow-sm px-2 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize bg-indigo-500/20 hover:bg-indigo-500/30 transition-all">
                {currentItem}
                <FaChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none right-0">
                    {["admin", "moderator", "user"].map((item, index) => (
                        <Menu.Item key={index}>
                            <button type="button" onClick={() => setUserRole(userId, item)} className={`${currentItem === item ? 'bg-indigo-500/20 text-indigo-500' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize
                    hover:bg-indigo-500 hover:text-white transition-colors`}>
                                {item}
                            </button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}