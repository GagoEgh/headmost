import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoUsserComponent } from './no-usser.component';

describe('NoUsserComponent', () => {
  let component: NoUsserComponent;
  let fixture: ComponentFixture<NoUsserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoUsserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoUsserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
