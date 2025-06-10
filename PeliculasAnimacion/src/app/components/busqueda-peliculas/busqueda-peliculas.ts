import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPelicula } from '../../interfaces/pelicula.interface';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { TextLimitPipe } from '../../pipes/text-limit-pipe';
import { firstValueFrom } from 'rxjs';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-busqueda-peliculas',
  imports: [TextLimitPipe, FormsModule, NgIf, NgFor],
  templateUrl: './busqueda-peliculas.html',
  styleUrl: './busqueda-peliculas.scss'
})
export class BusquedaPeliculas implements OnInit {
  termino: string = '';
  peliculas: IPelicula[] = [];

  cargando: boolean = false;
  mensajeError: String = "";

  constructor(private moviesService: MoviesService) { }

  async ngOnInit() {
    this.cargando = true;
    try {
      const respuesta = await this.moviesService.cargarPeliculas();
      this.peliculas = respuesta;

    } catch (error) {
      this.mensajeError = "Ha habido un error, inténtelo de nuevo más tarde";
    } finally {
      this.cargando = false;
    }
  }

  get peliculasFiltradas(): IPelicula[] {
    if (!this.termino) {
      return this.peliculas;
    }
    const lowerTerm = this.termino.toLowerCase();
    return this.peliculas.filter(p =>
      p.title.toLowerCase().includes(lowerTerm)
    );
  }
}
