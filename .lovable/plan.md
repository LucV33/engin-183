

## Build Complete Auth & Onboarding Flow

This is a large feature touching auth, routing, database, storage, and multiple new pages/components. Here's the plan:

### Database Changes (Migration)

1. Add `onboarding_completed` boolean column to `profiles` table (default false)
2. Add `onboarding_step` text column to `profiles` for resume capability
3. Add new columns to `creator_profiles`: `tiktok_handle`, `audience_type`, `display_handle`
4. Add new columns to `brand_profiles`: `industries` (text[]), `campaign_images` (text[])
5. Update existing `profiles` table to support the new flow

### New Pages & Components

**Pages:**
- `/auth` — Unified auth page (replaces `/login` and `/register`). Two tabs: Sign Up / Log In. Google OAuth button + email/password. Redirects authenticated users to dashboard.
- `/onboarding/role` — Full-screen role picker (Brand vs Creator cards)
- `/onboarding/brand` — 3-step brand onboarding with progress bar
- `/onboarding/creator` — 3-step creator onboarding with progress bar
- `/settings/profile` — Profile settings with sidebar nav, editable fields, image re-upload

**Components:**
- `ChipSelector` — Reusable tap-to-toggle chip/pill multi-select component
- `ImageUploader` — Reusable image upload with inline preview (supports circular crop mode for avatars)
- `OnboardingProgress` — Progress bar showing "Step X of 3"
- `OnboardingLayout` — Shared wrapper for onboarding steps (centered, progress bar, skip link)

### Auth Flow Changes

1. Update `AuthContext` to include `onboardingCompleted` state derived from `profiles.onboarding_completed`
2. Create new `/auth` page with Google OAuth (using `lovable.auth.signInWithOAuth("google")`) + email/password
3. Add redirect logic: after auth → check `onboarding_completed` → route to `/onboarding/role` or `/feed`
4. Update `ProtectedRoute` to redirect incomplete onboarding users to `/onboarding/role`
5. Update all landing page CTAs to point to `/auth` instead of `/waitlist`

### Routing Updates in App.tsx

- Add routes: `/auth`, `/onboarding/role`, `/onboarding/brand`, `/onboarding/creator`, `/settings/profile`
- Keep existing routes functional
- Remove or redirect old `/login` and `/register` routes to `/auth`

### Landing Page CTA Updates

- Update `Navbar` "Join Waitlist" → "Get Started" pointing to `/auth`
- Update `ForCreators` and `Index` page CTA buttons to route to `/auth`

### Settings Page

- Left sidebar with sections: Profile Info, Account & Security, Notifications (placeholder)
- Right panel with all onboarding fields as editable form
- Same `ChipSelector` components, image uploaders with current image + edit overlay
- Sticky "Save Changes" button, success toast on save

### Auto-Save

- Each onboarding step saves to database on completion (upsert to profiles/creator_profiles/brand_profiles)
- Store current step in `profiles.onboarding_step` so user can resume

### File Structure

```text
src/
  components/
    onboarding/
      ChipSelector.tsx
      ImageUploader.tsx  
      OnboardingProgress.tsx
      OnboardingLayout.tsx
      BrandStep1.tsx
      BrandStep2.tsx
      BrandStep3.tsx
      CreatorStep1.tsx
      CreatorStep2.tsx
      CreatorStep3.tsx
  pages/
    Auth.tsx
    OnboardingRole.tsx
    OnboardingBrand.tsx
    OnboardingCreator.tsx
    Settings.tsx
```

### Implementation Order

1. Run database migration (add columns)
2. Configure Google OAuth via social login tool
3. Build reusable components (ChipSelector, ImageUploader, OnboardingProgress)
4. Build `/auth` page
5. Update AuthContext with onboarding state
6. Build role selection page
7. Build brand onboarding (3 steps)
8. Build creator onboarding (3 steps)
9. Build settings/profile page
10. Update routing, ProtectedRoute, landing page CTAs
11. Update Navbar and AppLayout

