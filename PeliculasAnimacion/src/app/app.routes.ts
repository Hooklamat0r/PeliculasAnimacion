import { Routes } from '@angular/router';
import { Bienvenida } from './components/bienvenida/bienvenida';
import { BusquedaPeliculas } from './components/busqueda-peliculas/busqueda-peliculas';
import { AcercaDe } from './components/acerca-de/acerca-de';
import { PaginaNoEncontrada404 } from './components/pagina-no-encontrada404/pagina-no-encontrada404';
import { Admin } from './components/admin/admin';


export const routes: Routes = [
  { path: '', component: Bienvenida },
  { path: 'bienvenida', component: Bienvenida },
  { path: 'buscar', component: BusquedaPeliculas },
  { path: 'acerca-de', component: AcercaDe },
  { path: 'admin', component: Admin },
  { path: '**', component: PaginaNoEncontrada404 }
];
