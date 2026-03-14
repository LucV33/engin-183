

# Brand Onboarding Redesign + Freezing Fix

## Freezing Issue
The `useEffect` in `Auth.tsx` redirects to `/onboarding/role` when a user exists but onboarding isn't completed. However, the `OnboardingRole` page doesn't have a `ProtectedRoute` wrapper and the `AuthContext` may trigger a race condition where `loading` finishes but the profile hasn't been fetched yet, causing repeated redirects. The `handleDevLogin` function also navigates immediately after signup without waiting for the auth state change to propagate. This will be addressed by ensuring the dev login waits for the auth state to settle before navigating.

## Brand Onboarding Flow (4 Steps)

Rewrite `OnboardingBrand.tsx` to match the creator onboarding style — full-screen centered, same `OnboardingLayout`, back navigation, large touch targets.

### Step 1 — Brand Basics
- Brand name (required)
- Brand logo (circular `ImageUploader`)
- Website URL (optional)
- Industry multi-select chips

### Step 2 — Your First Product
- Product name (required)
- Product description (textarea, 200 char limit)
- Product images (multi-image uploader, up to 4)
- Product category/sector (chip selector: Beauty, Fashion, Tech, Home, Food, Health, etc.)

### Step 3 — Pricing & Commission
- Affiliate commission percentage — slider from 0% to 50% (in 5% increments)
- Hourly rate range — selectable cards: "$0–10", "$10–20", "$20–30", "$30–50", "$50–75", "$75–100"
- Past month GMV (optional input field)

### Step 4 — Completion
"You're all set!" screen with two CTAs:
- "Browse Creators" → `/feed`
- "View My Product" → `/my-products`

## Database Changes
- Add `past_month_gmv` (numeric) to `products` table — optional field for brand to report GMV

## Files to Change

1. **Migration** — add `past_month_gmv` to `products`
2. **`src/pages/OnboardingBrand.tsx`** — full rewrite with 4-step flow matching creator style
3. **`src/pages/Auth.tsx`** — fix dev login to wait for auth state before navigating

## Storage
- Brand logo uploads to `avatars` bucket with path `${user.id}/brand-logo`
- Product images upload to `product-images` bucket with path `${user.id}/product-0/${index}`

All paths use `user_id` prefix to satisfy existing RLS policies.

