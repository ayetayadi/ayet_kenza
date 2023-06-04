import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurscampagnesComponent } from './annonceurscampagnes.component';

describe('AnnonceurscampagnesComponent', () => {
  let component: AnnonceurscampagnesComponent;
  let fixture: ComponentFixture<AnnonceurscampagnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceurscampagnesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnonceurscampagnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
