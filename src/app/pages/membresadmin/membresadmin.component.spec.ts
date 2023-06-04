import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresadminComponent } from './membresadmin.component';

describe('MembresadminComponent', () => {
  let component: MembresadminComponent;
  let fixture: ComponentFixture<MembresadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembresadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembresadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
