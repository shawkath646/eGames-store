import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-5 lg:px-0">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-4">About Us</h3>
                        <p className="text-gray-400">Elevate your gaming experience with eGames Store, your premier e-commerce destination for all things gaming. Explore a vast array of offerings including game currencies, Google Play gift cards, subscriptions to various video streaming platforms, and more. With a wide range of payment methods available, seamless order completion is assured for swift and convenient transactions.</p>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                        <p className="text-gray-400">123 Main Street, City, Country</p>
                        <p className="text-gray-400">email@example.com</p>
                        <p className="text-gray-400">+1234567890</p>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                        <div className="flex items-center justify-center md:justify-start space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <Link href="https://www.facebook.com/bhubon.das.969" target="_blank" className="text-gray-400 hover:text-white transition duration-300">
                                <FaFacebook className="w-6 h-6" />
                            </Link>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                <FaInstagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 text-center">
                <p className="text-gray-400 pt-8">© {new Date().getFullYear()} eGames store. All rights reserved.</p>
            </div>
        </footer>
    );
}