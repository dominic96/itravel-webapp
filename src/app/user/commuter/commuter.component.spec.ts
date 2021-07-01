import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuterComponent } from './commuter.component';

describe('CommuterComponent', () => {
  let component: CommuterComponent;
  let fixture: ComponentFixture<CommuterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommuterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
