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
      friends: {
        Row: {
          created_at: string
          friend_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          user_id?: string
        }
      }
      invites: {
        Row: {
          created_at: string | null
          reciever_id: string
          sender_id: string
          status: Database["public"]["Enums"]["friend_request_status"]
        }
        Insert: {
          created_at?: string | null
          reciever_id: string
          sender_id: string
          status: Database["public"]["Enums"]["friend_request_status"]
        }
        Update: {
          created_at?: string | null
          reciever_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["friend_request_status"]
        }
      }
      likes: {
        Row: {
          liked_at: string | null
          meal_id: string
          user_id: string
        }
        Insert: {
          liked_at?: string | null
          meal_id: string
          user_id: string
        }
        Update: {
          liked_at?: string | null
          meal_id?: string
          user_id?: string
        }
      }
      meals: {
        Row: {
          author_id: string
          carbs: number
          city: string
          created_at: string
          diet: Database["public"]["Enums"]["diet_type"][]
          fats: number
          id: string
          image_url: string | null
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
          image_url?: string | null
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
          image_url?: string | null
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
      friend_request_status: "accepted" | "pending" | "declined"
      price_range: "expensive" | "avarage" | "cheap"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
