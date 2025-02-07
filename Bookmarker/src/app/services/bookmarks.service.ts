import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private apiUrl = `${API_URL}`;

  constructor(private http: HttpClient) {}

  // Fetch all bookmarks
  getBookmarks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((bookmarks) =>
        bookmarks.sort((a, b) => {
          if (a.datetime > b.datetime) return -1;
          if (a.datetime < b.datetime) return 1;
          return 0;
        })
      ),
      catchError((error) => {
        console.error('Error fetching bookmarks:', error);
        throw error;
      })
    );
  }

  // Add a bookmark
  addBookmark(bookmark: any): Observable<any> {
    return this.http.post(this.apiUrl, bookmark).pipe(
      catchError((error) => {
        console.error('Error adding bookmark:', error);
        throw error;
      })
    );
  }

  // Update a bookmark
  updateBookmark(bookmark: any): Observable<any> {
    const url = `${this.apiUrl}/${bookmark.id}`;
    return this.http.put(url, bookmark).pipe(
      catchError((error) => {
        console.error('Error updating bookmark:', error);
        throw error;
      })
    );
  }

  // Delete a bookmark
  deleteBookmark(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error deleting bookmark:', error);
        throw error;
      })
    );
  }
}