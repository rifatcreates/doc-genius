import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-violet-400 font-bold text-8xl mb-4">404</h1>
                <p className="text-white text-xl font-semibold mb-2">Page not found</p>
                <p className="text-gray-400 mb-8">The page you are looking for does not exist.</p>
                <Link to="/" className="text-white bg-violet-600 inline-block px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-violet-700">
                    Go Home
                </Link>
            </div>
        </div>
    )
}