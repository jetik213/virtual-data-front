import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabarPsicologoComponent } from './grabar-psicologo.component';

describe('GrabarPsicologoComponent', () => {
  let component: GrabarPsicologoComponent;
  let fixture: ComponentFixture<GrabarPsicologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrabarPsicologoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrabarPsicologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
