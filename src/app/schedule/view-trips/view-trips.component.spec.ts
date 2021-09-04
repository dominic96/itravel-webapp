import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTripsComponent } from './view-trips.component';

describe('ViewTripsComponent', () => {
  let component: ViewTripsComponent;
  let fixture: ComponentFixture<ViewTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
