# Carousel Component

Built with React, Tailwind CSS, and TypeScript, it is both responsive and accessible.

---

## Key Features

* **Infinite Scrolling Illusion:** Uses repeated video sets to simulate infinite navigation in either direction.
* **Responsive Design:** Dynamically adjusts item width using a custom `useResponsiveItemWidth` hook.
* **Keyboard Navigation:** Left and right arrow keys allow navigation through the carousel.
* **Auto-Play + Mute Controls:** Automatically plays the current video and pauses others; includes mute/play toggles.
* **Accessibility Enhancements:**

  * `aria-label` on the carousel container
  * `aria-current` on the active video card
  * `aria-live` region announces title changes
  * Descriptive labels for interactive controls

---

## Design Decisions

### 1. Infinite Scroll Setup

To support seamless navigation, the list of videos is repeated three times. When the user reaches the end of a set, the index resets to the central copy.

### 2. Accessibility Focus

* Interactive buttons (mute/play) have `aria-label`s
* Video cards use `role="group"` and `aria-current="true"`
* Video title changes are announced via `aria-live="polite"`

### 3. Performance

* Only one video plays at a time
* Non-active videos are paused and reset to reduce CPU usage
* `useEffect` hooks efficiently handle state transitions and input events

### 4. Reusability

* `VideoCard` is extracted as a standalone component
* `useResponsiveItemWidth` can be reused in other UI components

---

## ✅ Future Improvements

* Add swipe gestures for touch devices
* Lazy load off-screen videos
* Add dots or thumbnail previews for navigation context
* Animate in/out transitions for smoother experience
* Support captions/subtitles for videos

---

## 📂 File Structure (relevant parts)

```
src/
├── components/
│   ├── VideoCarousel.tsx
│   └── VideoCard.tsx
├── hooks/
│   └── useResponsiveItemWidth.ts
├── types/
│   └── Video.ts
```



 `sampleVideos` is an array of objects with:

```ts
interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}
```
