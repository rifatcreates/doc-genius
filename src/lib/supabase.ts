import type { Generation, Language } from '@/types';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =  import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveGeneration(userId: string, code: string, language: Language, output: string): Promise<void> {
    const {error} = await supabase.from("generations").insert({
        user_id: userId,
        code,
        language,
        output,
    })

    if (error) {
        throw new Error("Failed to save generation.")
    }
}

export async function getGenerations(userId: string): Promise<Generation[]> {
    const {data, error} = await supabase.from("generations").select("*").eq("user_id", userId).order("created_at", {ascending: false})

    if (error) {
        throw new Error("Failed to fetch history.")
    }

    return data as Generation[]
}

export async function deleteGeneration(id: string): Promise<void> {
    const { error } = await supabase.from("generations").delete().eq("id", id)

    if (error) {
        throw new Error("Failed to delete generation.")
    }
}