"use client";

import { useState, useEffect, useCallback } from "react";
import { UserItem } from "./UserItem";
import { AddUserForm } from "./AddUserForm";

interface User {
    id: number;
    nome: string;
}

export function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users`
            );
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Falha ao buscar usuários:", error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAddUser = async (name: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: name }),
            }
        );
        if (response.ok) {
            fetchUsers();
        }
    };

    const handleUpdate = async (id: number, newName: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: newName }),
            }
        );
        if (response.ok) {
            fetchUsers();
        }
    };

    const handleDelete = async (id: number) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
            {
                method: "DELETE",
            }
        ).then((response) => {
            if (response.ok) {
                fetchUsers();
            }
        });
    };

    return (
        <div className="w-full max-w-2xl p-4 bg-gray-800 rounded-lg space-y-4">
            <AddUserForm onAddUser={handleAddUser} />
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                    Lista de Usuários da API
                </h2>
                <ul>
                    {users.map((user) => (
                        <UserItem
                            key={user.id}
                            user={user}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
