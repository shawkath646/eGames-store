"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import moment from "moment";
import { FetchedNotificationQuery, NotificationItemType } from "@/types/types";
import { IoIosNotifications, IoMdDoneAll } from "react-icons/io";

export default function NavbarNotificationMenu({ notificationsQuery }: { notificationsQuery: FetchedNotificationQuery}) {
    return (
        <Menu as="div" className="relative">
            <Menu.Button className="group outline-none">
                <IoIosNotifications size={25} className="text-gray-300 hover:text-white transition-colors mt-1.5" />
                {notificationsQuery.unreadNotificationNumber > 0 && (
                    <p className="absolute -right-1 -top-1 bg-red-500 group-hover:bg-red-600 transition-colors text-xs text-white rounded-full flex items-center justify-center h-4 w-4">{notificationsQuery.unreadNotificationNumber > 9 ? "9+" : notificationsQuery.unreadNotificationNumber}</p>
                )}
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
                <Menu.Items className="absolute right-0 mt-2 h-[400px] w-80 origin-top-right divide-y space-y-2 divide-gray-900 shadow-lg bg-gray-800 rounded outline-none p-2">
                    {!!notificationsQuery.notifications.length ? (
                        notificationsQuery.notifications.map((item, index) => (
                            <Menu.Item key={index}>
                                <div className="p-3 rounded shadow-xl bg-gray-700 hover:bg-gray-600 transition-colors">
                                    <div className={`flex items-center justify-between space-x-2 ${item.isRead ? "text-gray-400" : "text-white"}`}>
                                        <p className="text-lg font-medium truncate">{item.title}</p>
                                        <p className="text-xs">{moment(item.timestamp).fromNow()}</p>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-1 line-clamp-3 h-[60px]">{item.description}</p>
                                </div>
                            </Menu.Item>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex items-center justify-center space-x-3 text-gray-300">
                                <p>You're all caught up!</p>
                                <IoMdDoneAll />
                            </div>
                        </div>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}