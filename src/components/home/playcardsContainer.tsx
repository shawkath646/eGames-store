import Link from "next/link";
import Image from "next/image";
import getPlayCardItems from "@/actions/database/home/getPlayCardItems";
import { FaGooglePlay } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoAlertCircle } from "react-icons/io5";


export default async function PlayCardsContainer() {

    const playCardItems = await getPlayCardItems();

    return (
        <section className="mt-20">
            <div className="flex items-center justify-center mb-8">
                <h2 className="font-semibold text-3xl text-white">Play Cards</h2>
                <FaGooglePlay size={40} className="text-white ml-2" />
            </div>
            {playCardItems.length ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
                    {playCardItems.map((item, index) => (
                        <article key={index} className="flex flex-col items-center justify-center bg-gray-900 border rounded-lg border-gray-700 hover:shadow-lg transition duration-300 py-4">
                            {item.icon ? (
                                <Image src={item.icon} alt={`${item.name} icon`} height={110} width={110} className="h-[110px] w-[110px] rounded-lg" />
                            ) : (
                                <FaGooglePlay size={60} className="text-gray-600 mb-2" />
                            )}
                            <p className="text-2xl text-white font-semibold text-center mb-2">{item.name}</p>
                            <Link href={`/product?type=playCards&productId=${item.id}`} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 flex space-x-2 items-center">
                                <p>Buy Now</p>
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