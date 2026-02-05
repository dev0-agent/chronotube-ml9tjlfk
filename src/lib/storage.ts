import { useSyncExternalStore } from 'react';
import { type Video, type Bookmark, type NewVideo, type NewBookmark } from '../db/schema';

const STORAGE_KEY = 'chronotube-storage';

interface StoreData {
  videos: Video[];
  bookmarks: Bookmark[];
}

const defaultData: StoreData = {
  videos: [],
  bookmarks: [],
};

class StorageRepository {
  private data: StoreData;
  private listeners: Set<() => void>;

  constructor() {
    this.data = this.load();
    this.listeners = new Set();
  }

  private load(): StoreData {
    if (typeof window === 'undefined') return defaultData;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;

    try {
      const parsed = JSON.parse(stored, (key, value) => {
        // Revive dates for 'createdAt' fields
        if (key === 'createdAt' && typeof value === 'string') {
          return new Date(value);
        }
        return value;
      });

      // Basic shape validation
      if (
        parsed &&
        Array.isArray(parsed.videos) &&
        Array.isArray(parsed.bookmarks)
      ) {
        return parsed as StoreData;
      }
      return defaultData;
    } catch (e) {
      console.error('Failed to parse storage', e);
      return defaultData;
    }
  }

  private save() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    this.emitChange();
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  getSnapshot = () => {
    return this.data;
  };

  // --- Videos CRUD ---

  getAllVideos(): Video[] {
    return this.data.videos;
  }

  getVideoById(id: string): Video | undefined {
    return this.data.videos.find((v) => v.id === id);
  }

  createVideo(video: Omit<NewVideo, 'id' | 'createdAt'> & { id?: string; createdAt?: Date }): Video {
    const newVideo: Video = {
      ...video,
      id: video.id || crypto.randomUUID(),
      createdAt: video.createdAt || new Date(),
    };
    // Prepend to list (newest first usually preferred)
    this.data.videos = [newVideo, ...this.data.videos];
    this.save();
    return newVideo;
  }

  updateVideo(id: string, updates: Partial<Omit<Video, 'id' | 'createdAt'>>): Video | undefined {
    const index = this.data.videos.findIndex((v) => v.id === id);
    if (index === -1) return undefined;

    const updatedVideo = { ...this.data.videos[index], ...updates };
    this.data.videos = [
      ...this.data.videos.slice(0, index),
      updatedVideo,
      ...this.data.videos.slice(index + 1),
    ];
    this.save();
    return updatedVideo;
  }

  deleteVideo(id: string): void {
    const initialVideoCount = this.data.videos.length;
    this.data.videos = this.data.videos.filter((v) => v.id !== id);
    
    if (this.data.videos.length !== initialVideoCount) {
        // Cascade delete bookmarks
        this.data.bookmarks = this.data.bookmarks.filter((b) => b.videoId !== id);
        this.save();
    }
  }

  // --- Bookmarks CRUD ---

  getAllBookmarks(): Bookmark[] {
    return this.data.bookmarks;
  }

  getBookmarksByVideoId(videoId: string): Bookmark[] {
    return this.data.bookmarks.filter((b) => b.videoId === videoId);
  }

  getBookmarkById(id: string): Bookmark | undefined {
    return this.data.bookmarks.find((b) => b.id === id);
  }

  createBookmark(bookmark: Omit<NewBookmark, 'id' | 'createdAt'> & { id?: string; createdAt?: Date }): Bookmark {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: bookmark.id || crypto.randomUUID(),
      createdAt: bookmark.createdAt || new Date(),
    };
    this.data.bookmarks = [newBookmark, ...this.data.bookmarks];
    this.save();
    return newBookmark;
  }

  updateBookmark(id: string, updates: Partial<Omit<Bookmark, 'id' | 'createdAt' | 'videoId'>>): Bookmark | undefined {
    const index = this.data.bookmarks.findIndex((b) => b.id === id);
    if (index === -1) return undefined;

    const updatedBookmark = { ...this.data.bookmarks[index], ...updates };
    this.data.bookmarks = [
      ...this.data.bookmarks.slice(0, index),
      updatedBookmark,
      ...this.data.bookmarks.slice(index + 1),
    ];
    this.save();
    return updatedBookmark;
  }

  deleteBookmark(id: string): void {
    const initialCount = this.data.bookmarks.length;
    this.data.bookmarks = this.data.bookmarks.filter((b) => b.id !== id);
    if (this.data.bookmarks.length !== initialCount) {
        this.save();
    }
  }
}

export const storage = new StorageRepository();

export function useStore<T>(selector: (data: StoreData) => T): T {
  return useSyncExternalStore(storage.subscribe, () => selector(storage.getSnapshot()));
}
