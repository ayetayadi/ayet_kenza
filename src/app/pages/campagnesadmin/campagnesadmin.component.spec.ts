import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampagnesadminComponent } from './campagnesadmin.component';

describe('CampagnesadminComponent', () => {
  let component: CampagnesadminComponent;
  let fixture: ComponentFixture<CampagnesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampagnesadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampagnesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
