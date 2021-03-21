import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitudeComponent } from './add-institude.component';

describe('AddInstitudeComponent', () => {
  let component: AddInstitudeComponent;
  let fixture: ComponentFixture<AddInstitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstitudeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
