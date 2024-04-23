"use server";
import { revalidateTag, revalidatePath } from 'next/cache'
import { auth } from "@/app/auth";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/config/firebase.config";
import { NotificationItemType } from "@/types/types";


const setNotification = async({ userId, title, description }: { userId?: string; title: string, description: string }) => {

    if (!userId) {
        const session = await auth();
        if (!session?.user.id) return false;
        userId = session.user.id;
    };

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) return false;

    const notificationObject: NotificationItemType = {
        id: uuidv4(),
        isRead: false,
        timestamp: new Date,
        title,
        description
    };

    await userDoc.ref.collection("notifications").doc(notificationObject.id).set(notificationObject);
    
    revalidateTag("navbarNotification");
    revalidatePath("/profile");
    return true;
};

export default setNotification;