import { Component, OnInit } from '@angular/core';

import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

// Listado de las variedades de café de la tienda en una tabla de Bootstrap.
@Component({
  selector: 'app-cafe-listar',
  templateUrl: './cafe-listar.component.html',
  standalone: false,
  styleUrl: './cafe-listar.component.css'
})
export class CafeListarComponent implements OnInit {
  cafes: Cafe[] = [];

  constructor(private cafeService: CafeService) { }

  /** Carga los cafés al iniciar el componente. */
  ngOnInit(): void {
    this.getCafes();
  }

  /** Pide los cafés al servicio y los guarda para mostrarlos en la tabla. */
  getCafes(): void {
    this.cafeService.getCafes().subscribe(cafes => {
      this.cafes = cafes;
    });
  }
}
