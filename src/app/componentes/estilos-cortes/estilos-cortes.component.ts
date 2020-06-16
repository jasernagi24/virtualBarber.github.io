import { Component, OnInit } from '@angular/core';
import { EstiloCorteModel } from '../../modelos/estiloCorte.model'
import { NgForm } from '@angular/forms';
import { EstiloCortesService } from 'src/app/servicios/estilo-cortes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estilos-cortes',
  templateUrl: './estilos-cortes.component.html',
  styleUrls: ['./estilos-cortes.component.css']
})
export class EstilosCortesComponent implements OnInit {

  //--- todos los cortes del service
  cortes: EstiloCorteModel[] = []
  corte = new EstiloCorteModel();
  // arreglo de cortes encontrados en la busqueda
  cortesBusqueda: EstiloCorteModel[] = []


  constructor(private _estiloCorteService: EstiloCortesService) { }

  ngOnInit(): void {
    this._estiloCorteService.getCortes().subscribe(Resp=>{
      this.cortes=Resp;
    })

  }
  public buscarCorte(busquedaCorte: string) {

    //---poner el arreglo vacio
    this.cortesBusqueda = []
    //---- poner string en minuscula
    busquedaCorte = busquedaCorte.toLowerCase();

    //recorrer arreglo cortes del service
    for (let i = 0; i < this.cortes.length; i++) {
      let corte = this.cortes[i]
      let nombreCorte = corte.nombreCorte.toLowerCase();

      //-- coincidir busqueda
      if (nombreCorte.indexOf(busquedaCorte) >= 0) {
        this.cortesBusqueda.push(corte)
        
      }
    }

  }

}

