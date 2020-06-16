import { Component, OnInit } from '@angular/core';
import { BarberosService, Barbero } from '../../servicios/barberos.service';
import { SolicitarProductoModel } from '../../modelos/solicitar-producto'
import { NgForm } from '@angular/forms';
import { TiendaProductoService } from 'src/app/servicios/tienda-producto.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  
  barberos: Barbero[] = []
  productos: SolicitarProductoModel[] = []
  producto = new SolicitarProductoModel();
  mostrarModificar:boolean = false;

  constructor(private _barberoService: TiendaProductoService, private _solicitarProductoService:TiendaProductoService, private router:Router) { }
  ngOnInit(): void {
    this._solicitarProductoService.getProductos().subscribe(Resp => {
      this.productos = Resp;
    })
  }

  cancelarSeleccion(){
    this.producto = new SolicitarProductoModel();
    this.mostrarModificar = false;
    console.log(this.producto)
    console.log(this.mostrarModificar)
  }

  seleccionProducto(producto: SolicitarProductoModel) {
    this.producto.id = producto.id;
    this.producto.img = producto.img;
    this.producto.titulo = producto.titulo;
    this.producto.descripcion = producto.descripcion;
    this.producto.precioProducto = producto.precioProducto;
    this.mostrarModificar = true;

  }

  deleteProducto(producto: SolicitarProductoModel,i:number) {
    Swal.fire({
      allowOutsideClick: false,
      title: 'Estas seguro de eliminar este producto?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(
      resp => {
        if (resp.value) {
          this.productos.splice(i, 1);
          this._solicitarProductoService.borrarProducto(producto.id).subscribe();
        }
      });
  }

  guardar(formularioProductos:NgForm){
    if(formularioProductos.invalid){
      return;
    }
    if(this.producto.id)
    {
      this._solicitarProductoService.actualizarProducto(this.producto).subscribe(resp => { console.log(resp) })
      
      Swal.fire({
        allowOutsideClick: false,
        title: 'Producto actualizado',
        icon: 'success',
      })
      
    }
    else
    {
      this._solicitarProductoService.crearProducto(this.producto).subscribe(resp=>{console.log(resp)})
      Swal.fire({
        allowOutsideClick: false,
        title: 'Producto registrado',
        icon: 'success',
      })
    }
    this.ngOnInit()
    this.ngOnInit()
  };

}
