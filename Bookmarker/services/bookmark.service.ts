import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private apiUrl = 'http://localhost:3000/bookmarks';

  constructor(private http: HttpClient) {}

  // Fetch and sort bookmarks by datetime (newest first)
  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.apiUrl).pipe(
      map((bookmarks) =>
        bookmarks.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      ),
      catchError((error) => {
        console.error('Error fetching bookmarks', error);
        return of([]);
      })
    );
  }

  // Add a new bookmark (auto-assign current datetime)
  addBookmark(bookmark: Omit<Bookmark, 'datetime'>): Observable<Bookmark> {
    const newBookmark = { ...bookmark, datetime: new Date().toISOString() }; // Current timestamp
    return this.http.post<Bookmark>(this.apiUrl, newBookmark);
  }

  // Delete a bookmark by ID
  deleteBookmark(id: string): Observable<Bookmark> {
    return this.http.delete<Bookmark>(`${this.apiUrl}/${id}`);
  }

  // Get bookmarks for a specific datetime
  getBookmarksByDatetime(datetime: string): Observable<Bookmark[]> {
    return this.getBookmarks().pipe(
      map((bookmarks) =>
        bookmarks.filter((b) => b.datetime.startsWith(datetime)) // Match YYYY-MM-DD or exact timestamp
      )
    );
  }

  // Get bookmarks within a datetime range
  getBookmarksByDateRange(startDate: string, endDate: string): Observable<Bookmark[]> {
    return this.getBookmarks().pipe(
      map((bookmarks) =>
        bookmarks.filter(
          (b) =>
            new Date(b.datetime) >= new Date(startDate) && new Date(b.datetime) <= new Date(endDate)
        )
      )
    );
  }
}
