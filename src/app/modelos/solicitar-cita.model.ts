import { Time } from '@angular/common';

export class SolicitarCitaModel{
    id:string;
    nombreCliente:string;
    celular: string;
    nombreBarbero:string;
    fecha: Date;
    hora: Time;
    estadoCita:boolean = true;

    constructor(){
        this.estadoCita=true;
    }
}