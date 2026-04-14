import { logout } from "@/api/auth";
import { Button } from "@base-ui/react";
import { FolderKanban } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {

        } finally {
            localStorage.removeItem("accessToken");
            navigate('/')
        }
    };

    return (
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
            {/* 로고 */}
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <FolderKanban className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">Taskflow</span>
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout}>
                로그아웃
            </Button>
        </header>
    );
}
