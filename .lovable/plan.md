

# My Products Edit + Brand Feed Polish

## 1. My Products — Show Images + Click to Edit
Update `MyProducts.tsx` to show the first product image as a card hero. Make entire card a `Link` to `/products/:id/edit`.

## 2. Edit Product Page (New File)
Create `src/pages/EditProduct.tsx`:
- Load product by `:id` from URL, verify `brand_id === user.id`
- Pre-fill form with title, description, category, budget range, platforms, commission, past_month_gmv
- Show existing images, allow adding/removing via `MultiImageUploader`
- Upload new images to `product-images` bucket at `${user.id}/${productId}/${index}`
- Update product on save, navigate back to `/my-products`

## 3. Brand Feed — Fix Join + Smart Cards
Update `BrandFeed.tsx`:
- **Fix FK**: Change `profiles!creator_profiles_profile_fkey(...)` to `profiles!inner(...)` or use `profiles(...)` without the named FK (since no FK exists, use a manual approach: fetch profiles separately or use an RPC). Actually, since PostgREST can't join without FK, I'll add the FK first via migration, or switch to fetching `profiles` in a second query. Simplest fix: add a FK from `creator_profiles.user_id` to `profiles.id`.
- **Experience badge**: When `follower_count === 0`, show `experience_level` as a badge (e.g. "New", "Getting Started") instead of "0 followers"
- **Default rating**: Display 4.0 when `rating === 0`
- **Product interests**: Show `product_interests` as additional tags on cards

## 4. Database Migration
Add FK from `creator_profiles.user_id` → `profiles.id` so PostgREST join works:
```sql
ALTER TABLE public.creator_profiles
  ADD CONSTRAINT creator_profiles_profile_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
```

## 5. Route
Add `/products/:id/edit` to `App.tsx` with `ProtectedRoute requiredRole="brand"`.

## Files
1. **Migration** — add FK on `creator_profiles.user_id`
2. **`src/pages/EditProduct.tsx`** — new page
3. **`src/pages/MyProducts.tsx`** — add hero images, link to edit
4. **`src/components/feeds/BrandFeed.tsx`** — fix join, experience badges, default rating, product interests
5. **`src/App.tsx`** — add edit route

