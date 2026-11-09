import { Component, OnInit } from '@angular/core';

import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

/** Tipos de café que ofrece la tienda. */
export const TIPO_ORIGEN = 'Café de Origen';
export const TIPO_BLEND = 'Blend';

// Listado de las variedades de café de la tienda en una tabla de Bootstrap.
@Component({
  selector: 'app-cafe-listar',
  templateUrl: './cafe-listar.component.html',
  standalone: false,
  styleUrl: './cafe-listar.component.css'
})
export class CafeListarComponent implements OnInit {
  cafes: Cafe[] = [];
  totalOrigen = 0;
  totalBlend = 0;

  constructor(private cafeService: CafeService) { }

  /** Carga los cafés al iniciar el componente. */
  ngOnInit(): void {
    this.getCafes();
  }

  /** Pide los cafés al servicio y los guarda para mostrarlos en la tabla. */
  getCafes(): void {
    this.cafeService.getCafes().subscribe(cafes => {
      this.cafes = cafes;
      this.contarPorTipo();
    });
  }

  /**
   * Calcula cuántas variedades hay de cada tipo a partir del listado recibido
   */
  contarPorTipo(): void {
    this.totalOrigen = this.cafes.filter(cafe => cafe.tipo === TIPO_ORIGEN).length;
    this.totalBlend = this.cafes.filter(cafe => cafe.tipo === TIPO_BLEND).length;
  }
}
