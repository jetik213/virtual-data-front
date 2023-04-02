import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabarAsesoriaComponent } from './grabar-asesoria.component';

describe('GrabarAsesoriaComponent', () => {
  let component: GrabarAsesoriaComponent;
  let fixture: ComponentFixture<GrabarAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrabarAsesoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrabarAsesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
