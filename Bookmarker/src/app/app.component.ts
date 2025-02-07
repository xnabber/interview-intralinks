import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { addBookmark, deleteBookmark, searchBookmarks, updateBookmark } from './store/bookmark.actions';
import { Bookmark } from './models/bookmark';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  filteredBookmarks$: Observable<any[]> = new Observable();
  bookmarks$: Observable<any[]> = new Observable();
  ngOnInit(): void {
    this.filteredBookmarks$ = this.store.select((state) => state.bookmarks.filteredBookmarks);
    this.bookmarks$ = this.store.select((state) => state.bookmarks.bookmarks);
    this.store.dispatch({ type: '[Bookmarks] Load Bookmarks' });
  }

  title = 'Bookmarker';
  value = '';
  isAddEditVisible = false;
  selectedBookmark: Bookmark | undefined = undefined;

  readonly dialog = inject(MatDialog);

  toggleBookmark() {
    this.isAddEditVisible = !this.isAddEditVisible;
  }

  saveBookmark(bookmark: Bookmark) {
    const now = new Date();
    bookmark.datetime = now.toISOString();

    if (this.selectedBookmark?.id !== '0') {
      this.store.dispatch(updateBookmark({ bookmark }));
      this.showNotification('Bookmark updated successfully!', 'success'); // Show success notification
    } else {
      bookmark.id = now.getTime().toString();
      this.store.dispatch(addBookmark({ bookmark }));
      this.showNotification('Bookmark added successfully!', 'success'); // Show success notification
    }

    this.toggleBookmark(); // Close the form after saving
  }

  deleteBookmark(id: string): void {
    this.store.dispatch(deleteBookmark({ id }));
    this.showNotification('Bookmark deleted successfully!', 'success'); // Show success notification
  }

  openDialog(bookmark: Bookmark) {
    const dialog = this.dialog.open(DialogComponent, { data: { bookmark } });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteBookmark(bookmark.id);
      }
    });
  }

  addBookmarkMenu() {
    this.selectedBookmark = { id: '0', title: '', url: '', datetime: '' };
    this.toggleBookmark();
  }

  editBookmark(bookmark: Bookmark) {
    this.toggleBookmark();
    this.selectedBookmark = bookmark;
  }

  filterBookmarks() {
    this.store.dispatch(searchBookmarks({ query: this.value }));
  }

  // Helper method to show snackbar notifications
  private showNotification(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right', // Position horizontally
      verticalPosition: 'bottom', // Position vertically
      panelClass: [panelClass], // Custom CSS class for styling
    });
  }
}