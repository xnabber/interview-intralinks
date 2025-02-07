import { createReducer, on } from '@ngrx/store';
import { loadBookmarksSuccess, addBookmark, updateBookmark, deleteBookmark, searchBookmarks } from './bookmark.actions';
import Fuse from 'fuse.js';

export interface BookmarkState {
  bookmarks: any[];
  filteredBookmarks: any[];
}

export const initialState: BookmarkState = {
  bookmarks: [],
  filteredBookmarks: []
};

export const bookmarksReducer = createReducer(
  initialState,

  // Load Bookmarks
  on(loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    bookmarks,
    filteredBookmarks: bookmarks
  })),

  // Add Bookmark
  on(addBookmark, (state, { bookmark }) => ({
    ...state,
    bookmarks: [...state.bookmarks, bookmark],
    filteredBookmarks: [...state.filteredBookmarks, bookmark]
  })),

  // Update Bookmark
  on(updateBookmark, (state, { bookmark }) => ({
    ...state,
    bookmarks: state.bookmarks.map(b =>
      b.id === bookmark.id ? bookmark : b
    ),
    filteredBookmarks: state.filteredBookmarks.map(b =>
      b.id === bookmark.id ? bookmark : b
    )
  })),

  // Delete Bookmark
  on(deleteBookmark, (state, { id }) => ({
    ...state,
    bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== id),
    filteredBookmarks: state.filteredBookmarks.filter(bookmark => bookmark.id !== id)
  })),

  // Search Bookmarks with Fuse.js
  on(searchBookmarks, (state, { query }) => {
    if (!query) {
      return {
        ...state,
        filteredBookmarks: state.bookmarks
      };
    }

    const fuse = new Fuse(state.bookmarks, {
      keys: ['title', 'url', 'category'],
      includeScore: true,
      threshold: 0.3
    });

    const results = fuse.search(query).map(result => result.item);
    return {
      ...state,
      filteredBookmarks: results
    };
  })
);