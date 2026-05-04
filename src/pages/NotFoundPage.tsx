import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <main className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">404 Page Not Found!</h1>
            <Link to="/">Go Home</Link>
        </main>
    )
}