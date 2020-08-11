import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDetailsModalComponent } from './favorite-details-modal.component';

describe('FavoriteDetailsModalComponent', () => {
  let component: FavoriteDetailsModalComponent;
  let fixture: ComponentFixture<FavoriteDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
