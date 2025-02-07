import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule }  from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { BookmarksGridComponent } from './components/bookmarks-grid/bookmarks-grid.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { BookmarksSearchResultsComponent } from './components/bookmarks-search-results/bookmarks-search-results.component';

import { bookmarksReducer } from './store/bookmark.reducers';
import { BookmarksEffects } from './store/bookmark.effects';
import { AppState } from './state/app.state';
import { BookmarksFilteredByDateComponent } from './components/bookmarks-filtered-by-date/bookmarks-filtered-by-date.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BookmarkComponent,
    AddEditComponent,
    BookmarksGridComponent,
    DialogComponent,
    BookmarksSearchResultsComponent,
    BookmarksFilteredByDateComponent
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
    MatMenuModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>({
      bookmarks: bookmarksReducer
    }),
    EffectsModule.forRoot([BookmarksEffects])
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
