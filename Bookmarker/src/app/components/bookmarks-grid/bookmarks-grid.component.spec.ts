import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksGridComponent } from './bookmarks-grid.component';

describe('BookmarksGridComponent', () => {
  let component: BookmarksGridComponent;
  let fixture: ComponentFixture<BookmarksGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarksGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarksGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
