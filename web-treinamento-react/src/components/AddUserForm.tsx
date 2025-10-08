"use client";

import React, { useState } from "react";

interface AddUserFormProps {
    onAddUser: (name: string) => void;
}

export function AddUserForm({ onAddUser }: AddUserFormProps) {
    const [name, setName] = useState("");
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim()) return;
        onAddUser(name);
        setName("");
    };

    return (
        <form onSubmit={handleSubmit} className=" flex gap-2 w-full max-w-2xl">
            <input
                type="text"
                placeholder="Nome do novo usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-700 text-white rounded px-2 py-1 flex-grow"
            />
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
            >
                Adicionar
            </button>
        </form>
    );
}
