import { Outlet } from "react-router-dom";
import Header from "./Header";


export default function AppLayout() {
    return (
        <div className="h-full flex flex-col">
            <Header />
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    )

}