import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        
                <h1 className="text-2xl font-bold text-white text-center">
                    Create an account
                </h1>
                <p className="text-sm text-gray-400 text-center mt-2">
                    Enter your email and password to sign up
                </p>

                <div className="mt-6 space-y-4">
                    <input
                    type="email"
                    placeholder="Email"
                     className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <input
                    type="password"
                     placeholder="Password"
                     className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <Button className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700 text-white">
                        Sign Up
                    </Button>
                </div>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                        <Link to="/login" className="text-violet-400 font-medium hover:underline">
                            Login
                        </Link>
                </p>

            </div>
        </div>
    )
}