import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Button } from './ui/button'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">

        <Link to="/" className="text-lg font-bold tracking-tight text-white">
          Doc<span className="text-violet-400">Genius</span>
        </Link>

        <div className="flex items-center gap-1">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/history"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  location.pathname === '/history'
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                History
              </Link>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-gray-400 hover:text-white text-sm cursor-pointer"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                Login
              </Link>
              
              <Link
                to="/signup"
                className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}