import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsadminComponent } from './teamsadmin.component';

describe('TeamsadminComponent', () => {
  let component: TeamsadminComponent;
  let fixture: ComponentFixture<TeamsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
