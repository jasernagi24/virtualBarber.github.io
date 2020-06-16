import { Component, OnInit } from '@angular/core';
import { EstiloCorteModel } from '../../modelos/estiloCorte.model'
import { NgForm } from '@angular/forms';
import { EstiloCortesService } from 'src/app/servicios/estilo-cortes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-corte',
  templateUrl: './agregar-corte.component.html',
  styleUrls: ['./agregar-corte.component.css']
})
export class AgregarCorteComponent implements OnInit {
  cortes:EstiloCorteModel[]=[]
  corte = new EstiloCorteModel();
  constructor(private _ingresarCorteService:EstiloCortesService, private router:Router) { }

  ngOnInit(): void {
  }

  guardar(formularioCortes:NgForm){
    console.log(formularioCortes)
    if(formularioCortes.invalid){
      return;
    }
    if(this.corte.id)
    {
      this._ingresarCorteService.actualizarCorte(this.corte).subscribe(resp => { console.log(resp) })
      Swal.fire({
        allowOutsideClick: false,
        title: 'Corte actualizada',
        icon: 'success',
      })
    }
    else
    {
      this._ingresarCorteService.crearCorte(this.corte).subscribe(resp=>{console.log(resp)})
      Swal.fire({
        allowOutsideClick: false,
        title: 'Corte registrado',
        icon: 'success',
      })
      this.router.navigateByUrl('/home')
    }
  };

}
