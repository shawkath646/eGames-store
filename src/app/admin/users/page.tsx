import RoleMenu from "./roleMenu";
import getAllUsers from "@/actions/database/admin/users/getAllUsers";
import { IoPerson } from "react-icons/io5";



export default async function Page() {

    const users = await getAllUsers();

    return (
        <main className="min-h-[700px] w-full bg-white text-black">
            <div className="container mx-auto pt-28 pb-20 px-5 lg:px-0">
                <div className="flex items-center justify-center space-x-3 text-blue-500">
                    <IoPerson size={24} />
                    <p className="text-2xl font-semibold text-center">Users</p>
                </div>

                <section className="mt-10">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-3 sm:px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-3 sm:px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-3 sm:px-6 py-3">
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => (
                                <tr key={index} className="bg-white border-b break-words">
                                    <td className="px-3 sm:px-6 py-4 font-medium capitalize">
                                        {item.fullName}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <p className="w-[60px] md:w-auto">{item.email}</p>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <RoleMenu userId={item.id} currentItem={item.role} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </main>
    );
}