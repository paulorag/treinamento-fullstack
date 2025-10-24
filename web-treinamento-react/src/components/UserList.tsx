"use client";

import { useState, useEffect, useCallback, use } from "react";
import { UserItem } from "./UserItem";
import { AddUserForm } from "./AddUserForm";

interface User {
    id: number;
    nome: string;
}

export function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users`
            );
            if (!response.ok) throw new Error("Falha ao buscar dados");
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error("Falha ao buscar usuários:", err);
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAddUser = async (name: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome: name }),
                }
            );
            if (!response.ok) throw new Error("Falha ao adicionar usuário");
            fetchUsers();
        } catch (err) {
            console.error("Falha ao adicionar usuário:", err);
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setIsLoading(false);
        }
    };

    const handleUpdate = async (id: number, newName: string) => {
        setIsLoading(true);
        setError(null);
        try {
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
            if (!response.ok) throw new Error("Falha ao atualizar usuário");
            fetchUsers();
        } catch (err) {
            console.error("Falha ao atualizar usuário:", err);
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) throw new Error("Falha ao deletar usuário");
            fetchUsers();
        } catch (err) {
            console.error("Falha ao deletar usuário:", err);
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl p-4 bg-gray-800 rounded-lg space-y-4">
            <AddUserForm onAddUser={handleAddUser} />

            <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                    Lista de Usuários da API
                </h2>

                {/* 6. Renderização condicional baseada no estado */}
                {isLoading && (
                    <p className="text-center text-gray-400">
                        Carregando usuários...
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-500">Erro: {error}</p>
                )}

                {!isLoading && !error && (
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
                )}
            </div>
        </div>
    );
}
