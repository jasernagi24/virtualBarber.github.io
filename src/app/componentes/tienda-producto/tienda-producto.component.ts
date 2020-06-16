import { Component, OnInit } from '@angular/core';
import { BarberosService, Barbero } from '../../servicios/barberos.service';
import { SolicitarProductoModel } from '../../modelos/solicitar-producto'
import { NgForm } from '@angular/forms';
import { TiendaProductoService } from 'src/app/servicios/tienda-producto.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-producto',
  templateUrl: './tienda-producto.component.html',
  styleUrls: ['./tienda-producto.component.css']
})
export class TiendaProductoComponent {
  productos:SolicitarProductoModel[]=[]
  barberos: Barbero[] = []
  carritoProductos:CarritoProductos[]=[]
  valorTotal:number=0
  producto = new SolicitarProductoModel();

  constructor(private _barberoService: BarberosService, private _solicitarProductoService:TiendaProductoService, private router:Router) { }

  ngOnInit(): void {
    this._solicitarProductoService.getProductos().subscribe(Resp=>{
      this.productos=Resp;
    })
  }

  guardar(formularioProductos:NgForm){
    console.log(formularioProductos)
    if(formularioProductos.invalid){
      return;
    }
    if(this.producto.id)
    {

    }
    else
    {
      this._solicitarProductoService.crearProducto(this.producto).subscribe(resp=>{console.log(resp)})
      Swal.fire({
        allowOutsideClick: false,
        title: 'Producto registrado',
        icon: 'success',
      })
      this.router.navigateByUrl('/home')
    }
  };

  eliminarCarrito(productoSeleccionado:string){
    var cant:number = 0;
    for (let Producto of this.carritoProductos){
      if(this.carritoProductos[cant].id == productoSeleccionado){
        this.carritoProductos.splice(cant,1);
        this.valorTotal = this.valorTotal - Producto.precioProducto
      }
      cant = cant + 1;
    }
    console.log(this.carritoProductos)
  }
  
}


export interface CarritoProductos{
  id:string,
  titulo:string,
  precioProducto:number,
}