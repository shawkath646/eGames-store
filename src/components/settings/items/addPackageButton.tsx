"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PackageDiaologBox from "./packageDialogBox";

export default function AddPackageButton({ categoryType, docId }: { categoryType: string; docId: string; }) {

    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setModalOpen(true)} className="hover:text-blue-600 transition-colors">
                <FaPlus size={20} />
            </button>
            <PackageDiaologBox categoryType={categoryType} docId={docId} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        </>
    );
}