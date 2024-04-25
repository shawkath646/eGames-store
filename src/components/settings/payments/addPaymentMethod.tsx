"use client";
import { useState } from "react";
import PaymentDialogBox from "./paymentDialogBox";
import { FaPlus } from "react-icons/fa";

export default function AddPaymentMethod({ }) {

    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setModalOpen(true)} className="hover:text-indigo-600 transition-colors">
                <FaPlus size={24} />
            </button>
            <PaymentDialogBox isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        </>
    );
}