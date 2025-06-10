import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPeliculas } from './busqueda-peliculas';

describe('BusquedaPeliculas', () => {
  let component: BusquedaPeliculas;
  let fixture: ComponentFixture<BusquedaPeliculas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaPeliculas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPeliculas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
