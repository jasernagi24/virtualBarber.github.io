import { Component, OnInit } from '@angular/core';
import { BarberosService, Barbero } from '../../servicios/barberos.service';
import { SolicitarCitaModel } from '../../modelos/solicitar-cita.model'
import { NgForm } from '@angular/forms';
import { SolicitarCitaService } from 'src/app/servicios/solicitar-cita.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-cita',
  templateUrl: './administrar-cita.component.html',
  styleUrls: ['./administrar-cita.component.css']
})
export class AdministrarCitaComponent {

  citas: SolicitarCitaModel[] = []
  barberos: Barbero[] = []
  cita = new SolicitarCitaModel();

  constructor(private _barberoService: BarberosService, private _solicitarCitaService: SolicitarCitaService, private router: Router) { }


  ngOnInit(): void {
    this._solicitarCitaService.getCitas().subscribe(Resp => {
      this.citas = Resp;
    })
    this.barberos = this._barberoService.getBarberos();
  }


  seleccionCita(cita: SolicitarCitaModel) {
    this.cita.id = cita.id;
    this.cita.nombreCliente = cita.nombreCliente;
    this.cita.celular = cita.celular;
    this.cita.nombreBarbero = cita.nombreBarbero;
    this.cita.fecha = cita.fecha;
    this.cita.hora = cita.hora;
    this.cita.estadoCita = cita.estadoCita;
  }

  guardar(formularioCitas: NgForm) {
    if (formularioCitas.invalid) {
      return;
    }
    if (this.cita.id) {
      this._solicitarCitaService.actualizarCita(this.cita).subscribe(resp => { console.log(resp) })
      Swal.fire({
        allowOutsideClick: false,
        title: 'Cita actualizada',
        icon: 'success',
      })
      this._solicitarCitaService.getCitas().subscribe(Resp => {
        this.citas = Resp;
      })
    }
    this.ngOnInit()
    this.ngOnInit()
  };

  borrarCita(cita: SolicitarCitaModel, i: number) {
    Swal.fire({
      allowOutsideClick: false,
      title: 'Estas seguro de eliminar esta cita?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(
      resp => {
        if (resp.value) {
          this.citas.splice(i, 1);
          this._solicitarCitaService.borrarCita(cita.id).subscribe();
        }
      });
  }

}
