import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark } from '../../models/bookmark';

@Component({
  selector: 'app-bookmarks-search-results',
  standalone: false,
  
  templateUrl: './bookmarks-search-results.component.html',
  styleUrl: './bookmarks-search-results.component.scss'
})
export class BookmarksSearchResultsComponent {
  @Input() bookmarks: Bookmark[] = [];
  @Input() value: string = '';
  @Output() emitBookmark = new EventEmitter<Bookmark>();
  @Output() emitDelete = new EventEmitter<Bookmark>();

  editBookmark(bookmark: Bookmark) {
    this.emitBookmark.emit(bookmark);
  }

  deleteBookmark(bookmark: Bookmark) {
    this.emitDelete.emit(bookmark);
  }
}
