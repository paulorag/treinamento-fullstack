"use client";
import { useState } from "react";

interface AddUserFormProps {
    onAddUser: (name: string) => void;
    onRequestClose: () => void;
}

export function AddUserForm({ onAddUser, onRequestClose }: AddUserFormProps) {
    const [name, setName] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim()) return;
        onAddUser(name);
        setName("");
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                Adicionar Novo Usuário
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-1"
                    >
                        Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nome do usuário"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onRequestClose}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Adicionar
                    </button>
                </div>
            </form>
        </div>
    );
}
