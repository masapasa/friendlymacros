export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      meals: {
        Row: {
          author_id: string
          carbs: number
          city: string
          created_at: string
          diet: Database["public"]["Enums"]["diet_type"][]
          fats: number
          id: string
          name: string
          price_range: Database["public"]["Enums"]["price_range"]
          protein: number
          restaurant: string
        }
        Insert: {
          author_id: string
          carbs: number
          city: string
          created_at?: string
          diet: Database["public"]["Enums"]["diet_type"][]
          fats: number
          id?: string
          name: string
          price_range: Database["public"]["Enums"]["price_range"]
          protein: number
          restaurant: string
        }
        Update: {
          author_id?: string
          carbs?: number
          city?: string
          created_at?: string
          diet?: Database["public"]["Enums"]["diet_type"][]
          fats?: number
          id?: string
          name?: string
          price_range?: Database["public"]["Enums"]["price_range"]
          protein?: number
          restaurant?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      diet_type:
        | "normal"
        | "vegan"
        | "keto"
        | "lowcarb"
        | "gluten-free"
        | "paleo"
      price_range: "expensive" | "avarage" | "cheap"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
