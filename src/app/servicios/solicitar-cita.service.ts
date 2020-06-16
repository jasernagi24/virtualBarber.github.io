import { Injectable } from '@angular/core';
import { SolicitarCitaModel } from '../modelos/solicitar-cita.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SolicitarCitaService {

  private url = "https://virtual-barber-2409.firebaseio.com/";

  constructor(private http: HttpClient) { }

  crearCita(cita: SolicitarCitaModel) {
    return this.http.post(`${this.url}citas.json`, cita)
      .pipe(
        map((resp: any) => {
          cita.id = resp.name;
          return
        })
      );

  }

  actualizarCita(cita: SolicitarCitaModel) {
    const citaTemp = {
      ...cita
    };
    delete citaTemp.id
    return this.http.put(`${this.url}citas/${cita.id}.json`, cita)
      .pipe(
        map((resp: any) => {
          cita.id = resp.name;
          return
        })
      );
  }

  borrarCita(id:string){
    console.log(id)
    return this.http.delete(`${this.url}citas/${id}.json`);
  }

  getCitas() {
    return this.http.get(`${this.url}citas.json`).pipe(
      map(resp=>this.crearArregloCitas(resp))
    )
  }

  private crearArregloCitas(citasObj: object) {
    if (citasObj === null) {
      return []
    }
    const citas: SolicitarCitaModel[] = [];
    Object.keys(citasObj).forEach(key => {
      const cita:SolicitarCitaModel=citasObj[key];
      cita.id=key;
      citas.push(cita);
    });
    return citas;

  }

}
