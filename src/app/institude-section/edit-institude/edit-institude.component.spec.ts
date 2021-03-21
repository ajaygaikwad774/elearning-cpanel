import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitudeComponent } from './edit-institude.component';

describe('EditInstitudeComponent', () => {
  let component: EditInstitudeComponent;
  let fixture: ComponentFixture<EditInstitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInstitudeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
