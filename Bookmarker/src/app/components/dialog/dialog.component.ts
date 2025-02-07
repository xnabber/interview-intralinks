import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bookmark } from '../../models/bookmark';

@Component({
  selector: 'app-dialog',
  standalone: false,
  
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly bookmark = inject(MAT_DIALOG_DATA) as { bookmark: Bookmark };
  onNoClick(): void {
    this.dialogRef.close();
  }
}
