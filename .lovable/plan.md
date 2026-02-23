

## Video Carousel: Instant Thumbnails + Smart Background Loading

### What Changes

**1. Save static thumbnail images to `public/images/thumbs/`**

Copy each uploaded PNG as a static thumbnail file. Also copy the new video file (`ssstik.io_@shophousemedia_1771884916326.mp4`) as `creator-10.mp4`. Mapping:

| Thumbnail | Video |
|---|---|
| ssstik.io_@shophousemedia_1771884405012.png | creator-1 |
| ssstik.io_@shophousemedia_1771884386813.png | creator-2 |
| ssstik.io_@garyvee_1771884277237.png | creator-3 |
| ssstik.io_@garyvee_1771884249395.png | creator-4 |
| ssstik.io_@shophousemedia_1771884235985.png | creator-5 |
| ssstik.io_@coralily.kin_1771884846822.png | creator-6 |
| ssstik.io_@garyvee_1771884831410.png | creator-7 |
| Screenshot_2026-02-23_at_2.49.36 PM.png | creator-8 |
| Screenshot_2026-02-23_at_2.50.36 PM.png | creator-9 |
| ssstik.io_@shophousemedia_1771884916326.png | creator-10 |

**2. Add the new video**

Copy the uploaded `.mp4` file to `public/videos/creator-10.mp4` and add it to the carousel.

**3. Update ForCreators.tsx**

Change `creatorVideos` from a string array to an array of objects with `src` and `poster`:

```text
const creatorVideos = [
  { src: "/videos/creator-1.mp4", poster: "/images/thumbs/creator-1.png" },
  { src: "/videos/creator-2.mp4", poster: "/images/thumbs/creator-2.png" },
  ...
  { src: "/videos/creator-10.mp4", poster: "/images/thumbs/creator-10.png" },
];
```

Pass both `src` and `poster` to each `VideoCard`.

**4. Redesign VideoCard.tsx loading strategy**

The core idea: thumbnails are always visible instantly (static images), videos load silently in the background, and playback begins on hover only when ready.

- **Instant thumbnail**: Use the `poster` image as a CSS `background-image` on the container div. This loads as a regular image -- fast and reliable. The video element is hidden until ready.
- **Smart background preloading**: A new `useVideoPreloader` hook in ForCreators manages a global loading queue:
  - On page mount, start preloading videos sequentially (not all at once to avoid network congestion)
  - Priority order: middle videos first (indices 3-5, where users are most likely to hover), then outward
  - Each video loads the first 10 seconds initially (using `MediaSource` API range requests where supported, or just letting the browser buffer naturally with `preload="auto"`)
  - After the first pass of 10s chunks, go back and finish loading the rest
- **Progress overlay on hover**: When a user hovers a card that isn't fully buffered yet:
  - The static thumbnail stays visible (no black screen ever)
  - A semi-transparent overlay shows a progress bar with percentage
  - Once `canplaythrough` fires, the overlay fades and video plays with sound
- **If video is already buffered on hover**: Plays immediately with sound, no overlay

### Technical Details

**VideoCard.tsx rewrite:**

```text
Component structure:
- Container div with background-image set to poster (instant visibility)
- Hidden video element (opacity-0 until playing)
- Loading overlay (shown only during hover + buffering)
- Play/pause overlay
- Volume toggle
- Bottom gradient

States:
- isReady: video has enough data to play
- isPlaying: currently playing
- isMuted: sound muted
- loadProgress: 0-100 buffer percentage
- isHovering: mouse is over the card

Behavior:
- Mount: video has preload="none" (preloader handles loading separately)
- Hover enter: if ready -> play immediately with sound; if not -> show progress overlay
- Hover leave: pause, reset, show poster
- Click: toggle play/pause
```

**Preloading strategy (in ForCreators.tsx):**

Rather than using a complex MediaSource approach (browser support varies), use a simpler but effective strategy:

1. Create hidden `<video>` elements or use `fetch` with `Range` headers for the priority videos
2. Actually, the simplest effective approach: set `preload="auto"` on the real video elements but control the loading order via a staggered approach -- render videos with `preload="none"` initially, then a `useEffect` sets them to `preload="auto"` in priority order with small delays (200ms apart)
3. Priority: center videos first (indices ~4-6 in the visible area), then expand outward
4. Since the carousel triples the array (27 elements), only preload the unique 10 videos, not all 30 instances

This gives instant thumbnails from static PNGs, progressive background loading prioritized for the most likely hover targets, and a smooth transition from thumbnail to video playback.

