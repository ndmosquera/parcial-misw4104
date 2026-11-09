import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CafeService } from './cafe.service';
import { Cafe } from './cafe';
import { environment } from '../../environments/environment';

describe('CafeService', () => {
  let service: CafeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CafeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('pide los cafés con GET a la URL del API', () => {
    const cafes = [new Cafe(1, 'Café de prueba', 'Blend', 'Salgar, Antioquia', 'Cacao', 1800, 'imagen.png')];
    let recibidos: Cafe[] | undefined;

    service.getCafes().subscribe(respuesta => recibidos = respuesta);

    const peticion = httpMock.expectOne(environment.cafesUrl);
    expect(peticion.request.method).toBe('GET');
    peticion.flush(cafes);
    expect(recibidos).toEqual(cafes);
  });
});
