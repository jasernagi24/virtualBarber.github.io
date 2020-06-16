import { Injectable } from '@angular/core';
import { EstiloCorteModel } from '../modelos/estiloCorte.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EstiloCortesService {
  private url = "https://virtual-barber-2409.firebaseio.com/";

  constructor(private http: HttpClient) { }

  crearCorte(corte: EstiloCorteModel) {
    return this.http.post(`${this.url}cortes.json`, corte)
      .pipe(
        map((resp: any) => {
          corte.id = resp.name;
          return
        })
      );

  }

  actualizarCorte(corte: EstiloCorteModel) {
    const corteTemp = {
      ...corte
    }
    delete corteTemp.id
    return this.http.put(`${this.url}cortes/${corte.id}.json`, corte)
      .pipe(
        map((resp: any) => {
          corte.id = resp.name;
          return
        })
      );
  }

  borrarCorte(id:string){
    return this.http.delete(`${this.url}corte/${id}.json`);
  }

  getCortes() {
    return this.http.get(`${this.url}cortes.json`).pipe(
      map(resp => this.crearArregloCortes(resp))
    )
  }

  private crearArregloCortes(cortesObj: object) {
    if (cortesObj === null) {
      return []
    }
    const cortes: EstiloCorteModel[] = [];
    Object.keys(cortesObj).forEach(key => {
      const corte: EstiloCorteModel = cortesObj[key];
      corte.id = key;
      cortes.push(corte);
    });
    return cortes;

  }
}