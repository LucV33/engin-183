

# Fix 3 Security Warnings

## 1. Leaked Password Protection Disabled
This requires enabling HaveIBeenPwned (HIBP) leaked password protection in the authentication settings. This is a **manual configuration** that needs to be done in the backend settings — it cannot be set via migrations or code. I will note this as requiring manual action and update the finding accordingly.

## 2. Profiles table over-broad read access
**Current**: `SELECT` policy on `profiles` uses `USING (true)` — any authenticated user reads all profiles including `onboarding_completed`, `onboarding_step`, `profile_images`.

**Fix**: Migration to drop the current permissive SELECT policy and replace with `USING (auth.uid() = id)` so users can only read their own full profile. Cross-user lookups already go through the `public_profiles` view.

Need to verify code doesn't query other users' profiles directly. The `BrandFeed.tsx` joins `creator_profiles` to `profiles` — need to check if that join will break.

## 3. Products missing role check
**Current**: INSERT/UPDATE/DELETE on `products` only check `auth.uid() = brand_id`. A creator could set `brand_id` to their own ID.

**Fix**: Migration to drop and recreate INSERT, UPDATE, DELETE policies with an additional role check:
```sql
EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'brand')
```

## Files / Changes

1. **Migration** — Drop + recreate `profiles` SELECT policy; drop + recreate `products` INSERT/UPDATE/DELETE policies with role check
2. **Leaked password** — Update finding as requiring manual backend config (cannot be automated)

## Code Impact Check
The `BrandFeed.tsx` joins `profiles` via `creator_profiles` FK. With the restricted profiles policy, a brand viewing the feed won't be able to read creator profile rows. Fix: change `BrandFeed.tsx` to join `public_profiles` instead of `profiles`, since `public_profiles` is a view with no RLS restrictions and only exposes safe fields (display_name, avatar_url, bio).

