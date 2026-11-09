import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CafeListarComponent, TIPO_BLEND, TIPO_ORIGEN } from './cafe-listar.component';
import { CafeService } from '../cafe.service';
import { Cafe } from '../cafe';

describe('CafeListarComponent', () => {
  let component: CafeListarComponent;
  let fixture: ComponentFixture<CafeListarComponent>;
  let compiled: HTMLElement;

  // Listado de prueba con 3 cafés
  const cafes: Cafe[] = [
    new Cafe(1, 'Café Especial Navegante', TIPO_ORIGEN, 'Guatapé, Antioquia', 'Cítrico, Naranja, Cacao', 1800, 'navegante.png'),
    new Cafe(2, 'Café Especial El Prístino', TIPO_BLEND, 'Chinchiná, Caldas', 'Chocolate negro, Caramelo', 1700, 'pristino.png'),
    new Cafe(3, 'Café Especial Valentina', TIPO_ORIGEN, 'Fredonia, Antioquia', 'Chocolate, Nuez', 1700, 'valentina.png')
  ];

  beforeEach(async () => {
    // El servicio se reemplaza por uno que entrega el listado de prueba
    const cafeService = jasmine.createSpyObj<CafeService>('CafeService', ['getCafes']);
    cafeService.getCafes.and.returnValue(of(cafes));

    await TestBed.configureTestingModule({
      declarations: [CafeListarComponent],
      providers: [{ provide: CafeService, useValue: cafeService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CafeListarComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('crea la tabla con el encabezado y una fila por cada uno de los 3 cafés', () => {
    expect(compiled.querySelectorAll('table thead tr').length).toBe(1);
    expect(compiled.querySelectorAll('table tbody tr').length).toBe(3);
    expect(compiled.querySelectorAll('table tr').length).toBe(4);
  });

  it('el encabezado tiene las columnas #, Nombre, Tipo y Región', () => {
    const columnas = Array.from(compiled.querySelectorAll('thead th')).map(th => th.textContent?.trim());
    expect(columnas).toEqual(['#', 'Nombre', 'Tipo', 'Región']);
  });

  it('cada fila muestra el número, nombre, tipo y región del café', () => {
    const filas = compiled.querySelectorAll('tbody tr');
    cafes.forEach((cafe, i) => {
      const celdas = Array.from(filas[i].querySelectorAll('th, td')).map(c => c.textContent?.trim());
      expect(celdas).toEqual([String(cafe.id), cafe.nombre, cafe.tipo, cafe.region]);
    });
  });

  it('calcula y muestra el total de cafés de origen y blend', () => {
    expect(component.totalOrigen).toBe(2);
    expect(component.totalBlend).toBe(1);
    expect(compiled.textContent).toContain('Total café de origen: 2');
    expect(compiled.textContent).toContain('Total café blend: 1');
  });
});
