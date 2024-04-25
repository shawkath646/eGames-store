import Link from "next/link";
import Image from "next/image";
import getGameItems from "@/actions/database/home/getGameItems";
import { GiConsoleController } from "react-icons/gi";
import { IoIosArrowForward, IoLogoGameControllerB } from "react-icons/io";
import { IoAlertCircle } from "react-icons/io5";

export default async function GamesContainer() {

    const gameItems = await getGameItems();

    return (
        <section className="mt-20">
            <div className="flex items-center justify-center mb-8">
                <h2 className="font-semibold text-3xl text-white">Available Games</h2>
                <GiConsoleController size={40} className="text-white ml-2" />
            </div>
            {!!gameItems.length ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
                    {gameItems.map((item, index) => (
                        <article key={index} className="flex flex-col items-center justify-center bg-gray-900 border rounded-lg border-gray-700 hover:shadow-lg transition duration-300 py-3">
                            {item.icon ? (
                                <Image src={item.icon} alt={`${item.name} icon`} height={75} width={75} className="h-[75px] w-[75px] rounded-lg" />
                            ) : (
                                <IoLogoGameControllerB size={60} className="text-gray-600" />
                            )}
                            <p className="text-2xl text-white font-semibold text-center mt-5">{item.name}</p>
                            <Link href={`/product?type=games&productId=${item.id}`} className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 flex space-x-2 items-center">
                                <p>Shop Now</p>
                                <IoIosArrowForward size={24} />
                            </Link>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center space-x-3 text-gray-300 py-14 bg-black/40 rounded">
                    <p className="font-medium text-xl">No item added</p>
                    <IoAlertCircle size={24} />
                </div>
            )}
        </section>
    );
}