import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMagnitComponent } from './form-magnit.component';

describe('FormMagnitComponent', () => {
  let component: FormMagnitComponent;
  let fixture: ComponentFixture<FormMagnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMagnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMagnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
