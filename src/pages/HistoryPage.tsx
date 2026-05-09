import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getGenerations, deleteGeneration } from '@/lib/supabase'
import { type Generation } from '@/types'
import HistoryList from '@/components/HistoryList'
import OutputDisplay from '@/components/OutputDisplay'
import { toast } from 'sonner'

export default function HistoryPage() {
  const { user } = useAuth()
  const [generations, setGenerations] = useState<Generation[]>([])
  const [selected, setSelected] = useState<Generation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return

    async function fetchHistory() {
      try {
        const data = await getGenerations(user!.id)
        setGenerations(data)
      } catch {
        setError('Failed to load history.')
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [user])

  async function handleDelete(id: string) {
    try {
      await deleteGeneration(id)
      setGenerations((prev) => prev.filter((g) => g.id !== id))
      if (selected?.id === id) setSelected(null)
      toast.success('Deleted successfully!')
    } catch {
      toast.error('Failed to delete.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">History</h1>
          <p className="mt-1 text-sm text-gray-400">
            Your past documentation generations
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {generations.length === 0 ? (
          <div className="flex min-h-100 items-center justify-center rounded-xl border border-dashed border-white/10">
            <div className="text-center">
              <p className="text-gray-400">No generations yet</p>
              <p className="mt-1 text-sm text-gray-600">
                Go to Dashboard and generate your first documentation
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <HistoryList
              generations={generations}
              onSelect={setSelected}
              onDelete={handleDelete}
            />

            <div>
              {selected ? (
                <OutputDisplay
                  output={selected.output}
                  isLoading={false}
                />
              ) : (
                <div className="flex min-h-100 items-center justify-center rounded-xl border border-dashed border-white/10">
                  <p className="text-sm text-gray-600">
                    Click a generation to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}