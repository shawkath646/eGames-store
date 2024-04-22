"use client";
import moment from "moment";
import { NotificationItemType } from "@/types/types";
import setNotificationRead from "@/actions/database/notification/setNotificationRead";


export default function NotificaitonItem({ notification }: { notification: NotificationItemType }) {
    return (
        <article className={`bg-gray-900 border border-gray-700 hover:shadow-lg transition duration-300 rounded-lg mb-3 p-4 ${notification.isRead ? "text-gray-400" : "text-white"}`}>
            <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-medium">{notification.title}</p>
                <p className="text-sm">{moment(notification.timestamp).fromNow()}</p>
            </div>
            <p className="text-gray-400 text-sm">{notification.description}</p>
            {!notification.isRead && (
                <button type="button" onClick={() => setNotificationRead(notification.id)} className="bg-gray-700 hover:bg-gray-800 transition-colors shadow-lg py-1 rounded font-medium w-full text-sm mt-1">Mark as Read</button>
            )}
        </article>
    );
}