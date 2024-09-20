import { headers } from "next/headers";
const Header = () => {
    return (
        <header className="h-12 items-center justify-center flex bg-orange-800">
            <img src="/logo.png" alt="logo" className="h-[44px]"/>
            <h1 className=" m-auto font-light text-2xl ">Memorista</h1>
        </header>
    )
};

export default Header
