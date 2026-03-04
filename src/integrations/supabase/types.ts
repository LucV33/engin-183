export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      brand_profiles: {
        Row: {
          company_name: string
          created_at: string
          id: string
          industry: string | null
          logo_url: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          company_name?: string
          created_at?: string
          id?: string
          industry?: string | null
          logo_url?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          industry?: string | null
          logo_url?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brand_profiles_profile_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          brand_user_id: string
          created_at: string
          creator_user_id: string
          id: string
          last_message_at: string | null
          product_id: string | null
        }
        Insert: {
          brand_user_id: string
          created_at?: string
          creator_user_id: string
          id?: string
          last_message_at?: string | null
          product_id?: string | null
        }
        Update: {
          brand_user_id?: string
          created_at?: string
          creator_user_id?: string
          id?: string
          last_message_at?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_brand_profile_fkey"
            columns: ["brand_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_creator_profile_fkey"
            columns: ["creator_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_profiles: {
        Row: {
          avg_gmv: number | null
          created_at: string
          follower_count: number | null
          id: string
          location: string | null
          niches: string[] | null
          past_collabs: string[] | null
          platforms: string[] | null
          portfolio_urls: string[] | null
          rating: number | null
          user_id: string
        }
        Insert: {
          avg_gmv?: number | null
          created_at?: string
          follower_count?: number | null
          id?: string
          location?: string | null
          niches?: string[] | null
          past_collabs?: string[] | null
          platforms?: string[] | null
          portfolio_urls?: string[] | null
          rating?: number | null
          user_id: string
        }
        Update: {
          avg_gmv?: number | null
          created_at?: string
          follower_count?: number | null
          id?: string
          location?: string | null
          niches?: string[] | null
          past_collabs?: string[] | null
          platforms?: string[] | null
          portfolio_urls?: string[] | null
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_profiles_profile_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          id: string
          conversation_id: string
          status: Database["public"]["Enums"]["deal_status"]
          hourly_rate: number | null
          commission_percentage: number | null
          hours: number | null
          total_amount: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          status?: Database["public"]["Enums"]["deal_status"]
          hourly_rate?: number | null
          commission_percentage?: number | null
          hours?: number | null
          total_amount?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          status?: Database["public"]["Enums"]["deal_status"]
          hourly_rate?: number | null
          commission_percentage?: number | null
          hours?: number | null
          total_amount?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: true
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_offers: {
        Row: {
          id: string
          deal_id: string
          sender_id: string
          hourly_rate: number
          commission_percentage: number
          hours: number
          note: string | null
          status: Database["public"]["Enums"]["offer_status"]
          created_at: string
        }
        Insert: {
          id?: string
          deal_id: string
          sender_id: string
          hourly_rate: number
          commission_percentage: number
          hours: number
          note?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          created_at?: string
        }
        Update: {
          id?: string
          deal_id?: string
          sender_id?: string
          hourly_rate?: number
          commission_percentage?: number
          hours?: number
          note?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_offers_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_signatures: {
        Row: {
          id: string
          deal_id: string
          user_id: string
          full_name: string
          signed_at: string
        }
        Insert: {
          id?: string
          deal_id: string
          user_id: string
          full_name: string
          signed_at?: string
        }
        Update: {
          id?: string
          deal_id?: string
          user_id?: string
          full_name?: string
          signed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_signatures_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_payments: {
        Row: {
          id: string
          deal_id: string
          amount: number
          status: Database["public"]["Enums"]["escrow_status"]
          funded_at: string | null
          released_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          deal_id: string
          amount: number
          status?: Database["public"]["Enums"]["escrow_status"]
          funded_at?: string | null
          released_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          deal_id?: string
          amount?: number
          status?: Database["public"]["Enums"]["escrow_status"]
          funded_at?: string | null
          released_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "escrow_payments_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: true
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          message_type: string
          metadata: Record<string, unknown> | null
          read_at: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          message_type?: string
          metadata?: Record<string, unknown> | null
          read_at?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          message_type?: string
          metadata?: Record<string, unknown> | null
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          id: string
          deal_id: string
          tracking_number: string | null
          carrier: string | null
          status: Database["public"]["Enums"]["shipment_status"]
          shipped_at: string | null
          delivered_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          deal_id: string
          tracking_number?: string | null
          carrier?: string | null
          status?: Database["public"]["Enums"]["shipment_status"]
          shipped_at?: string | null
          delivered_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          deal_id?: string
          tracking_number?: string | null
          carrier?: string | null
          status?: Database["public"]["Enums"]["shipment_status"]
          shipped_at?: string | null
          delivered_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipments_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string
          budget_max: number | null
          budget_min: number | null
          category: string | null
          commission_info: string | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          preferred_date: string | null
          status: Database["public"]["Enums"]["product_status"]
          target_platforms: string[] | null
          title: string
        }
        Insert: {
          brand_id: string
          budget_max?: number | null
          budget_min?: number | null
          category?: string | null
          commission_info?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          preferred_date?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          target_platforms?: string[] | null
          title: string
        }
        Update: {
          brand_id?: string
          budget_max?: number | null
          budget_min?: number | null
          category?: string | null
          commission_info?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          preferred_date?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          target_platforms?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_profile_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "creator" | "brand"
      deal_status: "negotiating" | "agreed" | "signed" | "escrow_funded" | "in_progress" | "completed" | "cancelled"
      escrow_status: "pending" | "funded" | "released" | "refunded"
      offer_status: "pending" | "accepted" | "rejected" | "countered" | "expired"
      product_status: "active" | "paused" | "closed"
      shipment_status: "pending" | "shipped" | "in_transit" | "delivered"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["creator", "brand"],
      deal_status: ["negotiating", "agreed", "signed", "escrow_funded", "in_progress", "completed", "cancelled"],
      escrow_status: ["pending", "funded", "released", "refunded"],
      offer_status: ["pending", "accepted", "rejected", "countered", "expired"],
      product_status: ["active", "paused", "closed"],
      shipment_status: ["pending", "shipped", "in_transit", "delivered"],
    },
  },
} as const
