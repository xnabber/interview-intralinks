import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Bookmark } from '../../models/bookmark';


@Component({
  selector: 'app-bookmarks-grid',
  standalone: false,
  
  templateUrl: './bookmarks-grid.component.html',
  styleUrl: './bookmarks-grid.component.scss'
})
export class BookmarksGridComponent {
  @Output() emitBookmark = new EventEmitter<Bookmark>();
  @Output() emitDelete = new EventEmitter<Bookmark>();

  @Input() bookmarks: Bookmark[] = [];

  // Track whether the list is expanded
  isExpanded: boolean = false;

  // Computed property to show either the first 3 bookmarks or all bookmarks
  get visibleBookmarks(): Bookmark[] {
    return this.isExpanded ? this.bookmarks : this.bookmarks.slice(0, 3);
  }

  // Emit event for editing a bookmark
  editBookmark(bookmark: Bookmark) {
    this.emitBookmark.emit(bookmark);
  }

  // Emit event for deleting a bookmark
  openDialog(bookmark: Bookmark) {
    this.emitDelete.emit(bookmark);
  }

  // Toggle the expand/collapse state
  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
