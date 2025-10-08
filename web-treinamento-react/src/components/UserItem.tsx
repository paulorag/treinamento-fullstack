"use client";
import { useState } from "react";

interface User {
    id: number;
    nome: string;
}

interface UserItemProps {
    user: User;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newName: string) => void;
}

export function UserItem({ user, onDelete, onUpdate }: UserItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user.nome);

    const handleSave = () => {
        onUpdate(user.id, newName);
        setIsEditing(false);
    };

    return (
        <li className="flex justify-between items-center text-gray-300 p-2 border-b border-gray-700">
            {isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-gray-700 text-white rounded  px-2 py-1"
                />
            ) : (
                <span>
                    {user.nome}(ID: {user.id})
                </span>
            )}
            <div className="flex gap-2">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="bg-green-500 hover:gb-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Salvar
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Editar
                    </button>
                )}
            </div>

            <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
            >
                Deletar
            </button>
        </li>
    );
}
