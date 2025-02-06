import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark } from '../../../../models/bookmark';

@Component({
  selector: 'app-add-edit',
  standalone: false,
  
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
  })
export class AddEditComponent {
  @Input() bookmark: Bookmark | undefined = undefined;
  @Output() closeAddEdit = new EventEmitter<void>();
  @Output() saveBookmarkEvent = new EventEmitter<Bookmark>();

  get isEditMode(): boolean {
    return !!this.bookmark?.id; // True if a bookmark is provided for editing
  }

  close() {
    this.closeAddEdit.emit(); // Notify parent to hide this component
  }

  saveBookmark() {
    if (!this.bookmark) {
    }

    // Ensure the bookmark has valid data
    if (!this.bookmark!.title || !this.bookmark!.url) {
      alert('Please provide both name and URL.');
      return;
    }

    this.saveBookmarkEvent.emit(this.bookmark); // Emit the updated or new bookmark
  }
}