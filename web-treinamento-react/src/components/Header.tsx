interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <header className="w-full p-4 bg-gray-800 text-center">
            <h1 className="text-2xl font-bold text-white">
                {title} {/**/}
            </h1>
        </header>
    );
}
