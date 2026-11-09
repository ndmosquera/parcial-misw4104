import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cafe } from './cafe';
import { environment } from '../../environments/environment';

// Obtiene las variedades de café disponibles en la tienda.
@Injectable({
  providedIn: 'root'
})
export class CafeService {
  private readonly apiUrl = environment.cafesUrl;

  constructor(private http: HttpClient) { }

  /**
   * Pide al API el listado completo de cafés.
   * @returns Observable que emite el arreglo de cafés.
   */
  getCafes(): Observable<Cafe[]> {
    return this.http.get<Cafe[]>(this.apiUrl);
  }
}
