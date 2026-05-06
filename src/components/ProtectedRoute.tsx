import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children } : { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <p className="text-gray-400">Loading...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <>{ children }</>
}