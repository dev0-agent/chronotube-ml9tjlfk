# ChronoTube

> Your personal YouTube timestamp and knowledge manager.

ChronoTube is a local-first dashboard that helps you extract value from long-form YouTube content. Build a personal library of timestamped insights, tag key moments, and search through your video notes without needing a backend or internet account.

## Tech Stack

*   **Framework:** React + Vite
*   **Styling:** Tailwind CSS + shadcn/ui
*   **Data Modeling:** Drizzle ORM (Schema definition)
*   **Persistence:** LocalStorage (Browser-based)
*   **Video Integration:** YouTube IFrame API

## Features

*   **Video Library:** Organize YouTube videos in a clean dashboard.
*   **Smart Bookmarking:** Capture timestamps with one click while watching.
*   **Contextual Notes:** Add rich comments and tags to every timestamp.
*   **Deep Linking:** Click a bookmark to instantly jump to that moment in the video.
*   **Local Privacy:** All data is stored in your browser's LocalStorage. Nothing is sent to a server.
*   **Data Backup:** Export and Import your library as JSON.

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd chronotube
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:5173` to start building your library.

## Documentation

*   [Task List](./TASKLIST.md) - Track project progress.
*   [Learnings](./LEARNINGS.md) - Technical insights and decisions.
*   [Dev Rules](./.dev0/RULES.md) - Coding standards and guidelines.
