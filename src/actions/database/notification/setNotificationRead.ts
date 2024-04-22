"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/app/auth"
import { db } from "@/config/firebase.config";

const setNotificationRead = async(notificationId: string) => {
    const session = await auth();
    if (!session?.user.id) return false;

    await db.collection("users").doc(session.user.id).collection("notifications").doc(notificationId).set({ isRead: true }, { merge: true });
    revalidateTag("navbarNotification")
    revalidatePath("/profile");
    return true;
};

export default setNotificationRead;