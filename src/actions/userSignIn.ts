"use server";
import { revalidatePath } from 'next/cache';

const userSignIn = (prevState: any, recieved: FormData) => {
    const userEmail = recieved.get("email-address");
    const userPassword = recieved.get("password");

    revalidatePath("/sign-in");

    return {
        userEmail: "Email is required",
        userPassword: "Password is required"
    };
};

export default userSignIn;