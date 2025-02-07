import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadBookmarks,
  loadBookmarksSuccess,
  loadBookmarksFailure,
  addBookmark,
  updateBookmark,
  deleteBookmark,
} from './bookmark.actions';
import { BookmarksService } from '../services/bookmarks.service'; // Import the service

@Injectable()
export class BookmarksEffects {
  constructor(
    private actions$: Actions,
    private bookmarksService: BookmarksService // Inject the service
  ) {}

  // Load Bookmarks Effect
  loadBookmarks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBookmarks),
      switchMap(() =>
        this.bookmarksService.getBookmarks().pipe(
          map((bookmarks) => loadBookmarksSuccess({ bookmarks })),
          catchError((error) => of(loadBookmarksFailure({ error })))
        )
      )
    );
  });

  // Add Bookmark Effect
  addBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBookmark),
      switchMap(({ bookmark }) =>
        this.bookmarksService.addBookmark(bookmark).pipe(
          map(() => loadBookmarks()) // Reload bookmarks after adding
        )
      )
    )
  );

  // Update Bookmark Effect
  updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBookmark),
      switchMap(({ bookmark }) =>
        this.bookmarksService.updateBookmark(bookmark).pipe(
          map(() => loadBookmarks()) // Reload bookmarks after updating
        )
      )
    )
  );

  // Delete Bookmark Effect
  deleteBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBookmark),
      switchMap(({ id }) =>
        this.bookmarksService.deleteBookmark(id).pipe(
          map(() => loadBookmarks()) // Reload bookmarks after deleting
        )
      )
    )
  );
}