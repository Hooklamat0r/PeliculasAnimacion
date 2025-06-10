import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNoEncontrada404 } from './pagina-no-encontrada404';

describe('PaginaNoEncontrada404', () => {
  let component: PaginaNoEncontrada404;
  let fixture: ComponentFixture<PaginaNoEncontrada404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNoEncontrada404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNoEncontrada404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
