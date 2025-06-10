import { Injectable } from '@angular/core';
import { IPelicula } from '../interfaces/pelicula.interface';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient, ) { }
  // https://api.sampleapis.com/movies/animation
  async cargarPeliculas(): Promise<IPelicula[]> {
    return await firstValueFrom(this.http.get<IPelicula[]>('http://localhost//DWEC/dev/APIAngular/cargar_peliculas.php'));
  }

  editarPelicula(pelicula: IPelicula) {
    return this.http.post('http://localhost//DWEC/dev/APIAngular/editar_peliculas.php', pelicula);
  }

  agregarPelicula(pelicula: Partial<IPelicula>) {
    return this.http.post('http://localhost//DWEC/dev/APIAngular/agregar_peliculas.php', pelicula);
  }

  eliminarPelicula(id: number) {
    return this.http.post('http://localhost//DWEC/dev/APIAngular/eliminar_peliculas.php', {id});
  }
}
