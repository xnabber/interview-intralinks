import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Bookmark } from '../../../../models/bookmark';


@Component({
  selector: 'app-bookmarks-grid',
  standalone: false,
  
  templateUrl: './bookmarks-grid.component.html',
  styleUrl: './bookmarks-grid.component.scss'
})
export class BookmarksGridComponent {
  @Output() emitBookmark = new EventEmitter<Bookmark>();
  @Output() emitDelete = new EventEmitter<Bookmark>();
  @Input() bookmarks : Bookmark[] = [];

  editBookmark(bookmark: Bookmark) {
    this.emitBookmark.emit(bookmark);
  }

  openDialog(bookmark: Bookmark) {
    this.emitDelete.emit(bookmark);
  }
}
