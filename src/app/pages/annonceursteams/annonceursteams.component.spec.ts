import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceursteamsComponent } from './annonceursteams.component';

describe('AnnonceursteamsComponent', () => {
  let component: AnnonceursteamsComponent;
  let fixture: ComponentFixture<AnnonceursteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceursteamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnonceursteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
