export type Language = "javascript" | "typescript" | "python";

export interface Generation {
    id: string,
    user_id: string,
    code: string,
    output: string,
    language: Language,
    created_at: string,
}