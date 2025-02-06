import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bookmark } from './../../models/bookmark';
import { Component, inject, OnInit } from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { BookmarkService } from '../../services/bookmark.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  constructor(private bookmarkService: BookmarkService) {}
  bookmarks$: Observable<Bookmark[]> = new Observable();
  ngOnInit(): void {
    this.bookmarks$ = this.bookmarkService.getBookmarks();
  }
  private _snackBar = inject(MatSnackBar);
  title = 'Bookmarker';
  value = '';
  isAddEditVisible = false;
  selectedBookmark: Bookmark | undefined = undefined;
  readonly dialog = inject(MatDialog);
  
  toggleBookmark() {
    this.isAddEditVisible = !this.isAddEditVisible;
  }

  saveBookmark(bookmark: Bookmark) {
    if (this.selectedBookmark?.id !== "0") {
      // Update existing bookmark
    } else {
      const now = new Date();
      bookmark.datetime = now.toISOString();
      bookmark.id = now.getTime().toString();
      this.bookmarkService.addBookmark(bookmark).subscribe(() => {
        this._snackBar.open('Bookmark saved successfully!', 'Close');
      });
    }
    this.toggleBookmark(); // Close the form after saving
  }

  deleteBookmark(id: string): void {
    this.bookmarkService.deleteBookmark(id).subscribe(
      () => {
        this._snackBar.open('Bookmark deleted successfully!', 'Close' );
      },
      (error) => {
        console.error('Error deleting bookmark:', error);
        this._snackBar.open('There has been an error!', 'Close' );
      }
    );
  }

  openDialog(bookmark: Bookmark) {
    const dialog = this.dialog.open(DialogComponent, {data: {bookmark}});

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteBookmark(bookmark.id);
      }
    });
  }

  addBookmark() {
    this.selectedBookmark = { id: "0",title: '', url: '', datetime: '' };
    this.toggleBookmark();
  }

  editBookmark(bookmark : Bookmark) {
    this.toggleBookmark();
    this.selectedBookmark = bookmark;
  }
}
