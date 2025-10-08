import { Header } from "@/components/Header";
import { UserList } from "@/components/UserList";

export default function Home() {
    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <Header title="Minha Aplicação com React e Node.js" />
            <UserList />
        </main>
    );
}
