import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDockComponent } from './create-dock.component';

describe('CreateDockComponent', () => {
  let component: CreateDockComponent;
  let fixture: ComponentFixture<CreateDockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
