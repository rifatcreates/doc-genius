import { useAuth } from "@/hooks/useAuth"
import { Link } from "react-router-dom";

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                <div className="inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/10 px-3 py-1 mb-6 rounded-full">
                    <div className="bg-violet-400 h-1.5 w-1.5 rounded-full" />
                    <span className="text-violet-300 text-xs">Powered by Google Gemini</span>
                </div>

                <h1 className="text-white font-bold text-4xl sm:text-5xl mb-4 leading-tight">
                    {`Generate Code Documentation `}
                    <span className="text-violet-400">Instantly</span>
                </h1>

                <p className="text-gray-400 text-lg mb-8">
                    Paste your code and get instant AI-generated documentation, function explanation, and a ready-to-use README.
                </p>

                <Link to={user? "/dashboard" : "/login"} className="text-white inline-block rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold transition-colors hover:bg-violet-700">
                    {user ? "Go to Dashboard" : "Get Started"}
                </Link>
            </div>
        </div>
    )
}