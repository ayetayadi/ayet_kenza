import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhomeComponent } from './adhome.component';

describe('AdhomeComponent', () => {
  let component: AdhomeComponent;
  let fixture: ComponentFixture<AdhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
