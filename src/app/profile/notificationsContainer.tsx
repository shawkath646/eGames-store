import NotificaitonItem from "@/app/profile/notificationItem";
import getNotifications from "@/actions/database/notification/getNotifications";
import { IoAlertCircle } from "react-icons/io5";

export default async function NotificationsContainer() {

    const notifications = await getNotifications();

    return (
        <section className="max-w-lg">
            <h2 className="font-semibold text-3xl mb-4 text-white">Notifications</h2>
            {!!notifications.length ? (
                notifications.map((item, index) => (
                    <NotificaitonItem key={index} notification={item} />
                ))
            ) : (
                <div className="flex items-center justify-center space-x-3 text-gray-300 py-14 bg-black/40 rounded">
                    <p className="font-medium text-xl">No notificaiton found</p>
                    <IoAlertCircle size={24} />
                </div>
            )}
        </section>
    );
}