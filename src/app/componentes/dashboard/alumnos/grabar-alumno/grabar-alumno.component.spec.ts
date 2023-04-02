import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabarAlumnoComponent } from './grabar-alumno.component';

describe('GrabarAlumnoComponent', () => {
  let component: GrabarAlumnoComponent;
  let fixture: ComponentFixture<GrabarAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrabarAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrabarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
