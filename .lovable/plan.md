

# Hostify Marketplace Architecture

## Overview

Two user types — **Creators** and **Brands** — each pick their role at signup. Creators browse product listings posted by brands; brands browse creator profiles. Either side can initiate a conversation.

## Database Schema

### Tables

**profiles** — core user info (auto-created on signup)
- id (FK to auth.users), role (creator/brand), display_name, avatar_url, bio, created_at

**user_roles** — security role table (for RLS, separate from profiles)
- id, user_id (FK to auth.users), role (app_role enum: creator, brand)

**creator_profiles** — extended creator data
- id, user_id (FK), niches (text array), platforms (text array: tiktok, instagram, amazon), follower_count, avg_gmv, rating, portfolio_urls (text array), past_collabs (text array), location, created_at

**brand_profiles** — extended brand data
- id, user_id (FK), company_name, website, industry, logo_url, created_at

**products** — brand product listings
- id, brand_id (FK to profiles), title, description, images (text array), category, budget_min, budget_max, target_platforms (text array), preferred_date, commission_info, status (active/paused/closed), created_at

**conversations** — chat threads between a brand and a creator
- id, brand_user_id (FK), creator_user_id (FK), product_id (FK, nullable — the product that started the convo), created_at, last_message_at

**messages** — individual messages within a conversation
- id, conversation_id (FK), sender_id (FK to auth.users), content (text), created_at, read_at

### Key Relationships

```text
auth.users
  +-- profiles (1:1)
  +-- user_roles (1:1)
  +-- creator_profiles (1:1, if role = creator)
  +-- brand_profiles (1:1, if role = brand)
  +-- products (1:many, brands only)
  +-- conversations (as brand or creator)
       +-- messages (1:many)
```

### Row-Level Security Strategy

- **profiles**: Users can read all profiles, update only their own
- **creator_profiles**: Readable by all authenticated users (brands need to browse), writable only by the owning creator
- **brand_profiles**: Same pattern — readable by all, writable by owner
- **products**: Readable by all authenticated users, writable only by the brand that created them
- **conversations**: Readable/writable only by the two participants
- **messages**: Readable only by conversation participants, insertable only by participants
- Role checks use a `has_role()` security definer function to avoid infinite recursion

## Application Flow

### Registration
1. User signs up with email/password
2. Picks role: "I'm a Creator" or "I'm a Brand"
3. Redirected to onboarding form:
   - **Creator**: Add bio, niches, platforms, stats, portfolio images/videos
   - **Brand**: Add company name, industry, website, logo
4. Profile saved, lands on their dashboard/feed

### Creator Experience
1. **Feed**: Scrollable list of active product listings from brands
   - Filter by category, platform, budget range
   - Search by keyword
2. **Product detail**: View full product info + brand profile
3. **Message**: Click "I'm interested" to start a conversation with the brand about that product

### Brand Experience
1. **Post Products**: Add product listings with images, budget, platforms, dates
2. **Feed**: Scrollable list of creator profiles
   - Filter by niche, platform, rating, GMV range
   - Search by name or keyword
3. **Creator detail**: View full creator profile + portfolio
4. **Message**: Click "Message" to start a conversation with a creator

### Messaging
1. Basic text messaging (no real-time — poll or refresh to see new messages)
2. Conversation list page showing all threads sorted by last message
3. Unread message indicator (count of messages where read_at is null)

## Pages to Build

| Page | Route | Who |
|------|-------|-----|
| Login | /login | All |
| Register | /register | All |
| Onboarding | /onboarding | New users |
| Creator Feed (products) | /feed | Creators |
| Brand Feed (creators) | /feed | Brands |
| Product Detail | /products/:id | Creators |
| Creator Detail | /creators/:id | Brands |
| My Products | /my-products | Brands |
| Add/Edit Product | /products/new | Brands |
| Conversations List | /messages | All |
| Conversation Thread | /messages/:id | All |
| My Profile / Settings | /profile | All |

## Technical Details

### Infrastructure
- **Lovable Cloud** for backend (Supabase-managed database, auth, edge functions, storage)
- **Supabase Auth** for email/password authentication
- **Supabase Storage** for profile photos, product images, and portfolio media
- **Edge functions** for any server-side logic (e.g., unread count, search indexing)

### Storage Buckets
- `avatars` — profile photos (public)
- `product-images` — brand product photos (public)
- `portfolio` — creator highlight reels and media (public)

### Frontend Patterns
- Protected routes using an auth context wrapper
- Role-based route guards (creators can't access brand pages and vice versa)
- TanStack Query for data fetching with pagination
- Existing shadcn/ui components for forms, cards, dialogs

### Implementation Order
1. Set up Lovable Cloud + database schema + RLS policies
2. Auth (login, register, role selection)
3. Onboarding flows (creator profile, brand profile)
4. Brand: product creation + management
5. Creator feed (browse products) with filters
6. Brand feed (browse creators) with filters
7. Messaging (conversations + messages)
8. Polish (unread counts, empty states, mobile responsiveness)

