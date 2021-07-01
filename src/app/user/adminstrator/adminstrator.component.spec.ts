import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstratorComponent } from './adminstrator.component';

describe('AdminstratorComponent', () => {
  let component: AdminstratorComponent;
  let fixture: ComponentFixture<AdminstratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminstratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
