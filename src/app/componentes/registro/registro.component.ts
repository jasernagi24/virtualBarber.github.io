import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel

  constructor(private authService:AuthService, private router:Router) { 

  }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(formulario: NgForm) {

    if(formulario.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere porfavor...',
      icon: 'info',
    })
    Swal.showLoading();
    this.authService.crearUsuario(this.usuario).subscribe(resp=>{
      Swal.close();
      this.router.navigateByUrl('/home')
    },(err)=>{
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error al registrar',
        icon: 'error',
        text: err.error.error.message,
      })
    });
  }

}
