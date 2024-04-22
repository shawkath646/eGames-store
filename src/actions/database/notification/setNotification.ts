import { revalidateTag, revalidatePath } from 'next/cache'
import { auth } from "@/app/auth";
import { v4 as uuidv4 } from 'uuid';
import { NotificationItemType } from "@/types/types";
import { db } from "@/config/firebase.config";

const setNotification = async(title: string, description: string) => {

    const session = await auth();
    if (!session?.user.id) return false;

    const notificationObject: NotificationItemType = {
        id: uuidv4(),
        isRead: false,
        timestamp: new Date,
        title,
        description
    };

    await db.collection("users").doc(session.user.id).collection("notifications").doc(notificationObject.id).set(notificationObject);
    revalidateTag("navbarNotification");
    revalidatePath("/profile");
    return true;
};

export default setNotification;