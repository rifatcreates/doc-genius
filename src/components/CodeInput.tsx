import { type Language } from "@/types"

interface CodeInputProps {
    code: string,
    setCode: (value: string) => void,
    language: Language,
    setLanguage: (value: Language) => void,
    onGenerate: () => void,
    isLoading: boolean
}

export default function CodeInput({code, setCode, language, setLanguage, onGenerate, isLoading}: CodeInputProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <label className="text-sm text-gray-400 shrink-0">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
                    <option value="javascript" className="bg-zinc-900">JavaScript</option>
                    <option value="typescript" className="bg-zinc-900">TypeScript</option>
                    <option value="python" className="bg-zinc-900">Python</option>
                </select>
            </div>

            <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paste your code here..." rows={18} className="w-full rounded-xl border border-white/10 bg-white/5 text-sm p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none font-mono" />

            <button onClick={onGenerate} disabled={isLoading || !code.trim()} className="w-full rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                {isLoading ? "Generating..." : "Generate Docs"}
            </button>
        </div>
    )
}