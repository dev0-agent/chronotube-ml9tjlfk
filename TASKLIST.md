# Task List

This file shows the current progress of all tasks in this project.
It is automatically updated by dev0 as tasks are completed.

---

## Phase 1

- [x] ✅ **Project Setup and Environment Configuration**
  Initialize the project structure. Create an `env.ts` module to handle environment variables (even if empty for now, it's good practice). Clean up the default Vite template (remove assets, generic CSS). Set up the folder structure: `components`, `lib`, `hooks`, `db`, `types`.

- [x] ✅ **Define Data Schema with Drizzle**
  Install `drizzle-orm`. Create `db/schema.ts`. Define two main schemas: `videos` (id, youtubeId, title, thumbnail, createdAt) and `bookmarks` (id, videoId, timestamp, note, tags, createdAt). Export TypeScript types inferred from these schemas. Note: We are using Drizzle for schema definition and type inference, which will then be used to validate data saved to LocalStorage.

- [ ] ⏳ **Implement LocalStorage Repository Pattern**
  Create a `lib/storage.ts` utility. This should implement basic CRUD operations (getAll, getById, create, update, delete) for both Videos and Bookmarks. It should read/write to LocalStorage, parsing the JSON and validating it against the types generated in Task 2. Include a custom hook `useStore` or similar for React components to access this data.

- [ ] ⏳ **App Shell and Navigation Layout**
  Create the main application layout using shadcn/ui components (Sidebar/Sheet for mobile, Header). The layout should have navigation links for 'Library' and 'Settings'. Implement a responsive container for the main content area.

## Phase 2

- [ ] ⏳ **Add Video Feature (URL Parsing)**
  Create a modal or page to add a new video. Input: YouTube URL. Logic: Extract the YouTube Video ID using regex. Since we don't have a backend to fetch metadata, allow the user to manually input the 'Title' or attempt to fetch it via `noembed` (optional enhancement). On save, create a record in the `videos` store.

- [ ] ⏳ **Video Library Dashboard**
  Create the home view displaying a grid of added videos. Each card should show the thumbnail (standard YouTube thumbnail URL: `img.youtube.com/vi/<id>/mqdefault.jpg`), title, and a 'Delete' button. Clicking a card navigates to the Video Player view.

- [ ] ⏳ **Video Player Integration**
  Create a `VideoPlayer` component wrapping `react-youtube` or a standard iframe with the IFrame Player API. It must expose a `ref` or method to `seekTo(seconds)` and `getCurrentTime()`. This component will be the centerpiece of the detailed video view.

- [ ] ⏳ **Timestamp Capture Interface**
  Build the control panel below/beside the video player. Include a 'Capture Timestamp' button. When clicked, it should query the player for `getCurrentTime()`, pause the video, and open a small form to enter a 'Note' and 'Tags'. Saving adds it to the `bookmarks` store associated with this video.

- [ ] ⏳ **Bookmark List and Navigation**
  Display a list of bookmarks next to the video player. Each item shows the timestamp (formatted MM:SS), the note, and tags. Clicking a bookmark item should trigger the player to seek to that specific timestamp. Highlight the active bookmark based on current player time (optional complexity, keep simple for now).

## Phase 3

- [ ] ⏳ **Tagging System Logic**
  Implement a robust tagging input component (using shadcn `Badge` and `Input`). Allow users to add/remove tags when creating or editing a bookmark. Ensure tags are stored in the bookmark record.

- [ ] ⏳ **Global Search Functionality**
  Implement a search bar in the header. It should filter the Library view by Video Title. Additionally, create a 'Search Results' view that finds specific Bookmarks matching the query (searching notes and tags) and links directly to the video at that timestamp.

- [ ] ⏳ **Data Export/Import**
  Add a Settings page with 'Export Data' (downloads a JSON file of all local storage data) and 'Import Data' (parses a JSON file and replaces local storage). This is crucial for data safety in a local-only app.

## Phase 4

- [ ] ⏳ **UI Polish and Empty States**
  Review the app for empty states (no videos, no bookmarks). Add helpful illustrations or text. Improve the responsiveness of the Player/Bookmark layout (stack on mobile, side-by-side on desktop). Ensure all shadcn components have consistent theming.

---

_Last updated by dev0 automation_
