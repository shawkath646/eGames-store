import Image from "next/image";
import eGamesStoreIcon from "@/assets/eGames-shop_icon_500x500.png"

export default async function Page() {
    return (
        <main className="w-full bg-white min-h-[700px] text-black">
            <div className="container mx-auto pt-28">
                <div className="flex items-center justify-center space-x-3">
                    <Image src={eGamesStoreIcon} alt="eGames store icon" height={50} width={50} />
                    <p className="text-2xl font-semibold">eGames store</p>
                </div>
            </div>
        </main>
    );
}