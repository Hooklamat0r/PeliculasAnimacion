import { Component, OnInit } from '@angular/core';
import { IPelicula } from '../../interfaces/pelicula.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  peliculas: IPelicula[] = [];
  peliculaForm!: FormGroup;
  editando: boolean = false;
  cargando: boolean = false;
  mensajeError: string = ''
  private idCounter = 1;

  constructor(private moviesService: MoviesService, private fb: FormBuilder) { }

  async ngOnInit() {

    this.peliculaForm = this.fb.group({
      id: [null],
      title: [''],
      posterURL: [''],
      imdbId: [''],
    });

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


  guardarPelicula() {

    if (this.editando) {

      if (!this.peliculaForm.value || !this.peliculaForm.get('id')?.value) return;

      const peliculaActualizar: IPelicula = {
        id: this.peliculaForm.get('id')!.value,
        title: this.peliculaForm.get('title')?.value,
        posterURL: this.peliculaForm.get('posterURL')?.value,
        imdbId: this.peliculaForm.get('imdbId')?.value
      };

      this.moviesService.editarPelicula(peliculaActualizar).subscribe(async () => {
        this.peliculas = await this.moviesService.cargarPeliculas();
      });

    } else {

      const title = this.peliculaForm.get('title')?.value;
      const posterURL = this.peliculaForm.get('posterURL')?.value;
      const imdbId = this.peliculaForm.get('imdbId')?.value;

      if ( !title || !posterURL || !imdbId) {
        this.mensajeError = "Debes introducir un titulo, un posterURL y un imdbId";
        return;
      }

      const peliculaAnadir: Partial<IPelicula> = {
        title,
        posterURL,
        imdbId
      };

      
      this.moviesService.agregarPelicula(peliculaAnadir).subscribe(async () => {
        this.peliculas = await this.moviesService.cargarPeliculas();
      });

    }

    this.cancelarEdicion();
  }

  editar(pelicula: IPelicula) {
    this.editando = true;
    this.peliculaForm.patchValue({
      id: pelicula.id,
      title: pelicula.title,
      posterURL: pelicula.posterURL,
      imdbId: pelicula.imdbId,
    });
  }

  eliminar(id: number) {
    this.moviesService.eliminarPelicula(id).subscribe(async () => {
      this.peliculas = await this.moviesService.cargarPeliculas();
    });
  }

  cancelarEdicion() {
    this.peliculaForm.patchValue({
      id: [null],
      title: [''],
      posterURL: [''],
      imdbId: [''],
    });
    this.editando = false;
  }
}
