import { IoPerson} from "react-icons/io5";

export default async function Page() {
    return (
        <main className="min-h-[700px] w-full bg-white text-black">
            <div className="container mx-auto pt-28 pb-20 px-5 lg:px-0">
                <div className="flex items-center justify-center space-x-3 text-blue-500">
                    <IoPerson size={24} />
                    <p className="text-2xl font-semibold text-center">Users</p>
                </div>
            </div>
        </main>
    );
}