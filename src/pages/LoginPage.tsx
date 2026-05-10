import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user, navigate])

    async function handleLogin() {
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message);
        }

        if (!error) {
            navigate("/dashboard");
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        
                <h1 className="text-2xl font-bold text-white text-center">
                    Welcome Back
                </h1>
                <p className="text-sm text-gray-400 text-center mt-2">
                    Enter your credentials to login
                </p>

                <div className="mt-6 space-y-4">
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <Button onClick={handleLogin} className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700 text-white">
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </div>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Don't have an account?{" "}
                        <Link to="/signup" className="text-violet-400 font-medium hover:underline">
                            Sign Up
                        </Link>
                </p>

            </div>
        </div>
    )
}