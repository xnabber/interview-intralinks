import { Bookmark } from '../../models/bookmark';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  standalone: false,
  
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss',
})
export class BookmarkComponent {
  @Output() emitBookmark = new EventEmitter<Bookmark>();
  @Output() emitDelete = new EventEmitter<Bookmark>();
  @Input() bookmark!: Bookmark;

  editBookmark(bookmark : Bookmark) {
    this.emitBookmark.emit(bookmark);
  }

  openDialog(){
    this.emitDelete.emit(this.bookmark);
  }
}
