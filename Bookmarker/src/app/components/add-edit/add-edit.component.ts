import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Bookmark } from '../../models/bookmark';

@Component({
  selector: 'app-add-edit',
  standalone: false,
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {
  @Input() bookmark: Bookmark | undefined = undefined;
  @Input() existingBookmarks: Bookmark[] = []; // Input for existing bookmarks
  @Output() closeAddEdit = new EventEmitter<void>();
  @Output() saveBookmarkEvent = new EventEmitter<Bookmark>();
  bookmarkForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookmarkForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80), this.noDuplicateTitle.bind(this)]],
      url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/|www\.)[^\s]+/), this.noDuplicateUrl.bind(this)]],
      datetime: ['']
    });

    if (this.bookmark) {
      this.bookmarkForm.patchValue({ ...this.bookmark });
    }
  }

  get isEditMode(): boolean {
    return !!this.bookmark?.id; // True if editing an existing bookmark
  }

  close(): void {
    this.closeAddEdit.emit(); // Notify parent to hide this component
  }

  onSubmit(): void {
    if (this.bookmarkForm.valid) {
      const rawBookmark = { ...this.bookmarkForm.value };

      let url = rawBookmark.url;
  
      url = url.replace(/^www\./, ''); // If the URL is prefixed with 'www.', we remove it and add 'http://'
  
      if (url && !url.match(/^(https?:\/\/)/)) {
        url = `http://${url}`;
      }
  
      const updatedBookmark: Bookmark = {
        ...rawBookmark,
        url: url
      };
      this.saveBookmarkEvent.emit(updatedBookmark); // Emit the updated bookmark
    }
  }

  /**
   * Custom validator to check for duplicate titles.
   */
  noDuplicateTitle(control: AbstractControl): ValidationErrors | null {
    const title = control.value;
    if (!title || !this.existingBookmarks) return null;

    const duplicate = this.existingBookmarks.find(
      (bookmark) => bookmark.title === title && (!this.isEditMode || bookmark.id !== this.bookmark?.id)
    );

    return duplicate ? { duplicateTitle: true } : null;
  }

  /**
   * Custom validator to check for duplicate URLs.
   */
  noDuplicateUrl(control: AbstractControl): ValidationErrors | null {
    const url = control.value;
    if (!url || !this.existingBookmarks) return null;

    const duplicate = this.existingBookmarks.find(
      (bookmark) => bookmark.url === url && (!this.isEditMode || bookmark.id !== this.bookmark?.id)
    );

    return duplicate ? { duplicateUrl: true } : null;
  }
}