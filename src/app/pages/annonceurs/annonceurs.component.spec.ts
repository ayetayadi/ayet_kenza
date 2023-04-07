import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceursComponent } from './annonceurs.component';

describe('AnnonceursComponent', () => {
  let component: AnnonceursComponent;
  let fixture: ComponentFixture<AnnonceursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnonceursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
