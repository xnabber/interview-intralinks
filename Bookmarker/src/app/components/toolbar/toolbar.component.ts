import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() isAddEditVisible = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>(); // New output for value changes
  @Output() addBookmark = new EventEmitter<void>();

  title = 'Bookmarker';

  toggleForm() {
    this.addBookmark.emit(); // Emit event to parent component
    this.value = '';
    this.valueChange.emit(this.value); // Notify parent of value change
  }

  onValueChange(newValue: string) {
    this.valueChange.emit(newValue); // Notify parent whenever value changes
  }
}
