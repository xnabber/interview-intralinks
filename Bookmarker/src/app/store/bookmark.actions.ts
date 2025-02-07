import { createAction, props } from '@ngrx/store';

export const loadBookmarks = createAction('[Bookmarks] Load Bookmarks');
export const loadBookmarksSuccess = createAction(
  '[Bookmarks] Load Bookmarks Success',
  props<{ bookmarks: any[] }>()
);
export const loadBookmarksFailure = createAction(
  '[Bookmarks] Load Bookmarks Failure',
  props<{ error: string }>()
);

// Add Bookmark Action
export const addBookmark = createAction(
  '[Bookmarks] Add Bookmark',
  props<{ bookmark: any }>()
);

// Update Bookmark Action
export const updateBookmark = createAction(
  '[Bookmarks] Update Bookmark',
  props<{ bookmark: any }>()
);

// Delete Bookmark Action
export const deleteBookmark = createAction(
  '[Bookmarks] Delete Bookmark',
  props<{ id: string }>()
);

// Search Bookmarks Action
export const searchBookmarks = createAction(
  '[Bookmarks] Search Bookmarks',
  props<{ query: string }>()
);