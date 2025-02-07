import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark } from '../../models/bookmark';

@Component({
  selector: 'app-bookmarks-filtered-by-date',
  standalone: false,
  templateUrl: './bookmarks-filtered-by-date.component.html',
  styleUrl: './bookmarks-filtered-by-date.component.scss'
})
export class BookmarksFilteredByDateComponent {
  @Input() bookmarks: Bookmark[] = [];
  @Output() emitBookmark = new EventEmitter<Bookmark>();
  @Output() emitDelete = new EventEmitter<Bookmark>();

  // Grouped bookmarks
  todayBookmarks: Bookmark[] = [];
  yesterdayBookmarks: Bookmark[] = [];
  olderBookmarks: Bookmark[] = [];

  ngOnInit(): void {
    this.groupBookmarksByDate();
  }

  ngOnChanges(): void {
    this.groupBookmarksByDate();
  }

  groupBookmarksByDate(): void {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0]; // "YYYY-MM-DD"

    this.todayBookmarks = [];
    this.yesterdayBookmarks = [];
    this.olderBookmarks = [];

    this.bookmarks.forEach((bookmark) => {
      const bookmarkDateStr = bookmark.datetime.split('T')[0]; // Extract "YYYY-MM-DD" from "datetime"

      if (bookmarkDateStr === today) {
        this.todayBookmarks.push(bookmark);
      } else if (bookmarkDateStr === yesterdayStr) {
        this.yesterdayBookmarks.push(bookmark);
      } else {
        this.olderBookmarks.push(bookmark);
      }
    });
  }

  editBookmark(bookmark: Bookmark): void {
    this.emitBookmark.emit(bookmark);
  }

  deleteBookmark(bookmark: Bookmark): void {
    this.emitDelete.emit(bookmark);
  }
}