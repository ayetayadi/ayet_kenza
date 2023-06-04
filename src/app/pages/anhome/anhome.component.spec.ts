import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnhomeComponent } from './anhome.component';

describe('AnhomeComponent', () => {
  let component: AnhomeComponent;
  let fixture: ComponentFixture<AnhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
