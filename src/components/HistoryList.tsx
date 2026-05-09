import type { Generation } from "@/types"

interface HistoryListProps {
    generations: Generation[],
    onSelect: (generation: Generation) => void,
    onDelete: (id: string) => void
}

export default function HistoryList({generations, onSelect, onDelete}: HistoryListProps) {
    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    return (
        <div className="flex flex-col gap-3">
        {generations.map((gen) => (
            <div
            key={gen.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-violet-500/30 hover:bg-white/10"
            >

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                    <span className="rounded-md bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-300 capitalize">
                        {gen.language}
                    </span>
                    <span className="text-xs text-gray-500">
                        {formatDate(gen.created_at)}
                    </span>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete(gen.id)
                    }}
                    className="rounded-md px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                >
                    Delete
                </button>
          </div>

          <p
            onClick={() => onSelect(gen)}
            className="text-sm text-gray-400 font-mono line-clamp-2 cursor-pointer hover:text-gray-200 transition-colors"
          >
            {gen.code}
          </p>
        </div>
      ))}
    </div>
  )
}