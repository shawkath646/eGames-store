import NotificaitonItem from "@/app/profile/notificationItem";
import getNotifications from "@/actions/database/notification/getNotifications";

export default async function NotificationsContainer() {

    const notifications = await getNotifications();

    return (
        <section className="max-w-lg">
            <h2 className="font-semibold text-3xl mb-4 text-white">Notifications</h2>
            {notifications.map((item, index) => (
                <NotificaitonItem key={index} notification={item} />
            ))}
        </section>
    );
}