import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstitudeComponent } from './view-institude.component';

describe('ViewInstitudeComponent', () => {
  let component: ViewInstitudeComponent;
  let fixture: ComponentFixture<ViewInstitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstitudeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
