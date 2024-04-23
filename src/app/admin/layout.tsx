import { auth } from "@/app/auth";
import LockAnimation from "./LockAnimation";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const session = await auth();

    if (!session || (session.user.role !== "admin" && session.user.role !== "moderator")) {
        return (
            <main className="bg-white text-black">
                <div className="min-h-[700px] container mx-auto pt-28 pb-20 lg:pb-40 lg:pt-48 px-5 lg:px-0 flex flex-col items-center justify-center gap-8">
                    <LockAnimation />
                    <p className="text-2xl font-medium text-indigo-500 text-center">You do not have permission to visit this page.</p>
                </div>
            </main>
        );
    }

    return <>{children}</>;
}
