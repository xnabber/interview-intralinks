import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() isAddEditVisible = false;
  @Output() addBookmark = new EventEmitter<void>();
  title = 'Bookmarker';
  value = '';

  toggleForm() {
    this.addBookmark.emit(); // Emit event to parent component
  }
}
