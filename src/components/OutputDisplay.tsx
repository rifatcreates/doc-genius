interface OutputDisplayProps {
    output: string,
    isLoading: boolean
}

export default function OutputDisplay({output, isLoading}: OutputDisplayProps) {
    if (isLoading) {
        return (
            <div className="flex h-full min-h-100 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
                    <p className="text-sm text-gray-400">Generating documentation...</p>
                </div>
            </div>
        )
    }

    if (!output) {
        return (
            <div className="flex h-full min-h-100 items-center justify-center rounded-xl border border-dashed border-white/10">
                <p className="text-sm text-gray-600">
                Your documentation will appear here
                </p>
            </div>
        )
  }

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                {output}
            </pre>
        </div>
    )
}