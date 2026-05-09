import { useState } from 'react'
import CodeInput from '@/components/CodeInput'
import OutputDisplay from '@/components/OutputDisplay'
import { type Language } from '@/types'
import { generateDocumentation } from '@/lib/gemini'
import { saveGeneration } from '@/lib/supabase'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState<Language>('javascript')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  async function handleGenerate() {
    if (!code.trim()) return;

    setIsLoading(true);
    setOutput("");
    setError("");

    try {
      const result = await generateDocumentation(code, language);
      setOutput(result);

      if (user) {
        await saveGeneration(user.id, code, language, result)
        toast.success("Documentation saved!")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="mx-auto max-w-6xl">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Documentation Generator</h1>
          <p className="mt-1 text-sm text-gray-400">
            Paste your code and get instant AI-generated documentation
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CodeInput
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <OutputDisplay
            output={output}
            isLoading={isLoading}
          />
        </div>

      </div>
    </div>
  )
}