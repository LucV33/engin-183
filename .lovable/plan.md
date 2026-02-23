

## Static Video Carousel - Complete Redesign

### Overview
Replace the infinite-scrolling marquee with a clean, static carousel showing 4 videos side-by-side with left/right arrow navigation. Click to play with sound; only one video plays at a time.

### Video Selection (8 videos with thumbnails available)
Use the 8 videos that have matching poster thumbnails: `creator-1` through `creator-7` plus `creator-10`. Skip `creator-8` and `creator-9` (no thumbnails).

### New Component: `StaticVideoCarousel.tsx`
A self-contained carousel component replacing the current marquee section:

- **Layout**: A horizontal row of video cards with overflow hidden, using CSS `translateX` for smooth sliding
- **Navigation**: Left/right arrow buttons positioned on each side of the carousel
- **Responsive**: 4 visible on desktop (>=1024px), 2 on tablet (>=640px), 1 on mobile
- **Preloading**: Videos currently in the visible window get `preload="auto"`. Videos outside get `preload="none"`. When arrows are clicked and new videos slide into view, their preload switches to `"auto"`
- **Click behavior**: Click a video to play unmuted. Click again to pause. If another video is already playing, pause it first (managed via a shared `activeIndex` state)
- **Speaker icon overlay**: A small `Volume2` icon on each thumbnail so users know clicking plays with sound
- **Arrows**: Styled with the existing `Button` component (`variant="outline"`, `size="icon"`), using `ChevronLeft`/`ChevronRight` icons. Disabled at the start/end of the list

### Rewrite `VideoCard.tsx`
Simplified for the new click-to-play model (no hover logic):

- Props: `src`, `poster`, `isActive` (controlled by parent), `preload`, `onTogglePlay`
- Shows poster as CSS `background-image` (instant load)
- When `isActive` becomes true: play unmuted. When false: pause and reset
- Loading progress bar overlay shown while buffering after click
- Speaker icon overlay when not playing

### Changes to `ForCreators.tsx`
- Remove `useVideoPreloader` import and `carouselPaused` state
- Replace the marquee `<section>` with `<StaticVideoCarousel />`
- Pass the 8 selected videos with their poster paths

### Technical Details

**StaticVideoCarousel state:**
- `currentIndex`: first visible video index (shifts by 1 on arrow click)
- `activeVideoIndex`: which video is currently playing (null if none)
- `visibleCount`: 4/2/1 based on window width (via media query or `useIsMobile` pattern)

**Sliding animation:**
- Container holds all 8 cards in a flex row
- Outer wrapper has `overflow-hidden`
- Inner container uses `transform: translateX(-(currentIndex * cardWidthPercent)%)` with `transition-transform duration-300`
- Each card takes `100/visibleCount`% width

**Preload management:**
- Videos at indices `currentIndex` to `currentIndex + visibleCount - 1` get `preload="auto"`
- All others get `preload="none"`

**Files to create:**
- `src/components/StaticVideoCarousel.tsx`

**Files to modify:**
- `src/components/VideoCard.tsx` (simplify for click-to-play)
- `src/pages/ForCreators.tsx` (swap carousel section)

**Files to delete (no longer needed):**
- `src/hooks/useVideoPreloader.ts`
