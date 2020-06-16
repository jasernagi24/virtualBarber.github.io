import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarberosService {
  private barberos:Barbero[]=[
    {
      idBarbero:1,
      nombreBarbero:"Julian 'El niche'"
    },
    {
      idBarbero:2,
      nombreBarbero:"Camilo 'El rolo'"
    },
    {
      idBarbero:3,
      nombreBarbero:"Francisco"
    },
    {
      idBarbero:4,
      nombreBarbero:"Roberto"
    },

  ]
  constructor() { }
  public getBarberos():Barbero[]{
    return this.barberos
  }
}

export interface Barbero{
  idBarbero:number,
  nombreBarbero:string
}