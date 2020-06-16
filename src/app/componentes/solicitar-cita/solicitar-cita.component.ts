import { Component, OnInit } from '@angular/core';
import { BarberosService, Barbero } from '../../servicios/barberos.service';
import { SolicitarCitaModel } from '../../modelos/solicitar-cita.model'
import { NgForm } from '@angular/forms';
import { SolicitarCitaService } from 'src/app/servicios/solicitar-cita.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-cita',
  templateUrl: './solicitar-cita.component.html',
  styleUrls: ['./solicitar-cita.component.css']
})
export class SolicitarCitaComponent {

  barberos: Barbero[] = []
  cita = new SolicitarCitaModel();

  constructor(private _barberoService: BarberosService, private _solicitarCitaService:SolicitarCitaService, private router:Router) { }

  ngOnInit(): void {
    this.barberos = this._barberoService.getBarberos();
  }

  guardar(formularioCitas:NgForm){
    console.log(formularioCitas)
    if(formularioCitas.invalid){
      return;
    }
    if(this.cita.id)
    {
    }
    else
    {
      this._solicitarCitaService.crearCita(this.cita).subscribe(resp=>{console.log(resp)})
      Swal.fire({
        allowOutsideClick: false,
        title: 'Cita registrada',
        icon: 'success',
      })
      this.router.navigateByUrl('/home')
    }
  };

}
