import { toast } from "sonner"
import ReactMarkdown from "react-markdown"

interface OutputDisplayProps {
    output: string,
    isLoading: boolean
}

export default function OutputDisplay({output, isLoading}: OutputDisplayProps) {
    function handleCopy() {
        navigator.clipboard.writeText(output)
        toast.success("Copied to clipboard!")
    }

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
        <>
            <div className="rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <p className="text-sm font-medium text-gray-300">Generated Documentation</p>
                    <button
                        onClick={handleCopy}
                        className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                        Copy
                    </button>
                </div>

                <div className="prose prose-invert prose-sm max-w-none p-6">
                    <ReactMarkdown>{output}</ReactMarkdown>
                </div>

            </div>
        </>
    )
}