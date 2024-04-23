import Link from "next/link";
import getVoucherItems from "@/actions/database/home/getVoucherItems";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { IoAlertCircle } from "react-icons/io5";


export default async function VouchersContainer() {

    const voucherItems = await getVoucherItems();

    return (
        <section className="mt-20">
            <div className="flex items-center justify-center mb-8">
                <h2 className="font-semibold text-3xl text-white">Vouchers</h2>
                <BsFillTicketPerforatedFill size={40} className="text-white ml-2" />
            </div>
            {!!voucherItems.length ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
                    {voucherItems.map((item, index) => (
                        <article key={index} className="flex flex-col py-4 items-center justify-center bg-gray-900 border rounded-lg border-gray-700 hover:shadow-lg transition duration-300">
                            <BsFillTicketPerforatedFill size={60} className="text-gray-600 mb-2" />
                            <p className="text-2xl text-white font-semibold text-center">{item.name}</p>
                            <Link href={`/product?type=vouchers&productId=${item.id}`} className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 flex space-x-2 items-center">
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