import type { Language } from "@/types"

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

export async function generateDocumentation(code: string, language: Language): Promise<string> {
    console.log('API KEY:', import.meta.env.VITE_GEMINI_API_KEY)


    const prompt = `You are a code documentation expert. Analyze the following ${language} code and provide clear documentation.

    Your response must include:
    1. **Overview** - What this code does in 2-3 sentences
    2. **Functions/Methods** - For each function explain:
    - What it does
    - Parameters (name, type, description)
    - Return value
    3. **README Section** - A ready-to-use markdown README snippet for this code

    Keep explanations simple and beginner-friendly.

    Here is the code:
    \`\`\`${language}
    ${code}
    \`\`\`
    `

    const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        })
    })

    if (!response.ok) {
        throw new Error('Failed to generate documentation. Please try again.')
    }

    const data = await response.json()
    
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!result) {
        throw new Error('No response received from AI. Please try again.')
    }

    return result
}