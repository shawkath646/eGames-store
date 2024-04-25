"use client";
import { useState } from "react";
import GamesDialogBox from "../items/itemDialogBox";
import { FaPlus } from "react-icons/fa";


export default function AddGames() {

    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setModalOpen(true)} className="hover:text-indigo-600 transition-colors">
                <FaPlus size={24} />
            </button>
            <GamesDialogBox itemCategory="games" isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        </>
    );
}