import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

export const videos = sqliteTable('videos', {
  id: text('id').primaryKey(),
  youtubeId: text('youtube_id').notNull(),
  title: text('title').notNull(),
  thumbnail: text('thumbnail').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const bookmarks = sqliteTable('bookmarks', {
  id: text('id').primaryKey(),
  videoId: text('video_id').notNull().references(() => videos.id, { onDelete: 'cascade' }),
  timestamp: integer('timestamp').notNull(),
  note: text('note'),
  tags: text('tags'), // Store as a serialized string (e.g., JSON array or comma-separated)
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export type Video = InferSelectModel<typeof videos>;
export type NewVideo = InferInsertModel<typeof videos>;
export type Bookmark = InferSelectModel<typeof bookmarks>;
export type NewBookmark = InferInsertModel<typeof bookmarks>;
