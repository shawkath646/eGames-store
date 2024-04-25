"use client";
import { useState } from "react";
import ItemDialogBox from "./itemDialogBox";
import { FaPlus } from "react-icons/fa";


export default function AddItemButton({ categoryType }: { categoryType: string; }) {

    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setModalOpen(true)} className="hover:text-indigo-600 transition-colors">
                <FaPlus size={24} />
            </button>
            <ItemDialogBox categoryType={categoryType} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        </>
    );
}