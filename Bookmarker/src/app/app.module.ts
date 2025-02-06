import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule }  from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from "@angular/material/tooltip";
import { BookmarksGridComponent } from './components/bookmarks-grid/bookmarks-grid.component';
import { BookmarkService } from '../../services/bookmark.service';
import { MatMenuModule } from '@angular/material/menu';
import { DialogComponent } from './components/dialog/dialog.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BookmarkComponent,
    AddEditComponent,
    BookmarksGridComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  providers: [
    provideAnimationsAsync(),
    BookmarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
