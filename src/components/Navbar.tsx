import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
    const location = useLocation();
    const { user } = useAuth();

    async function handleLogout() {
        await supabase.auth.signOut();
    }

    const navLinks = [
        { label: "Dashboard", to: "/dashboard" },
        { label: "History", to: "/history" }
    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
            <div className="flex mx-auto h-14 max-w-6xl items-center justify-between px-4">
                <Link to="/" className="text-lg font-bold tracking-tight text-white">
                    Doc<span className="text-violet-400">Genius</span>
                </Link>

                <div className="flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                location.pathname === link.to
                                    ? 'bg-violet-500/20 text-violet-300'
                                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {user && (
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="text-gray-400 hover:text-white text-sm cursor-pointer"     
                        >
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}