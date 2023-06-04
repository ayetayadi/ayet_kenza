import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbannersComponent } from './allbanners.component';

describe('AllbannersComponent', () => {
  let component: AllbannersComponent;
  let fixture: ComponentFixture<AllbannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbannersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllbannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
