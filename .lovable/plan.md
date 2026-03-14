

# Creator Onboarding Redesign — Updated Plan

## Flow Structure

**Step 0 → Role Selection** (existing `OnboardingRole` page — keep as-is)
Then for creators, a **5-step onboarding flow**:

### Step 1 — Welcome & Basics
- First name + Last name (side-by-side inputs)
- Large circular profile photo upload
- Full-screen centered layout

### Step 2 — Product Interests
- "What types of products are you interested in selling?"
- Large chip grid: Beauty, Fashion, Tech, Home & Kitchen, Food & Beverage, Health & Fitness, Toys & Games, Lifestyle, Pets, Automotive, Sports, Other

### Step 3 — Live Shopping Experience
- "How much experience do you have with live shopping?"
- Four large selectable cards (icon + title + description):
  - **Brand New** — "I haven't done live shopping yet"
  - **Getting Started** — "I've done it a few times"
  - **Experienced** — "I do it regularly"
  - **Pro** — "It's a big part of my income"

### Step 4 — TikTok Affiliate Status
- "Do you have a TikTok Shop affiliate account?" _(1,000+ followers required)_
- Two large selectable cards:
  - **Yes, I have one** — "I'm already accepted into TikTok Shop"
  - **I need one** — "I'd like gmv.live to help me get set up"

### Step 5 — Add Photos
- "Add some photos to your profile" — "Help brands see your content style"
- Multi-image uploader (up to 4)
- "Complete Setup" CTA

## Database Migration

Add columns to `creator_profiles`:
- `first_name` text
- `last_name` text
- `experience_level` text (new / some / experienced / pro)
- `product_interests` text[] (default '{}')
- `has_tiktok_affiliate` text (yes / need_one)

Add column to `profiles`:
- `profile_images` text[] (default '{}')

## Files to Change

1. **SQL migration** — add new columns
2. **`src/pages/OnboardingCreator.tsx`** — full rewrite with 5-step flow, full-screen centered steps, back button on steps 2+, animated progress bar
3. **`src/components/onboarding/OnboardingLayout.tsx`** — update for full-screen centered layout with back button support
4. **New: `src/components/onboarding/SelectionCard.tsx`** — large tappable card component (icon + title + description) for steps 3 & 4
5. **`OnboardingRole.tsx`** — no changes needed, stays as step 0

## UX Principles
- Full viewport height per step, content vertically centered
- Thin edge-to-edge progress bar at top
- Large touch targets (min 48px), mobile-first
- Chip selectors for multi-select, card selectors for single-select
- Back button on steps 2-5
- Smooth CSS transitions between steps

