import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFleetComponent } from './view-fleet.component';

describe('ViewFleetComponent', () => {
  let component: ViewFleetComponent;
  let fixture: ComponentFixture<ViewFleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFleetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
