import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../servicios/home.service'
import { from } from 'rxjs';
import { HomeModel } from '../../modelos/home.model'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent {

  homes:HomeModel[]=[]
  constructor( private _homeService:HomeService, private router: Router) { }

  ngOnInit():void{
    this._homeService.getHomes().subscribe(Resp => {
      this.homes = Resp;
    })
  }

}
