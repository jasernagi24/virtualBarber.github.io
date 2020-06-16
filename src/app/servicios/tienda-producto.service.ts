import { Injectable } from '@angular/core';
import { SolicitarProductoModel } from '../modelos/solicitar-producto';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TiendaProductoService {

  private url = "https://virtual-barber-2409.firebaseio.com/";

  constructor(private http: HttpClient) { }

  crearProducto(producto: SolicitarProductoModel) {
    return this.http.post(`${this.url}productos.json`, producto)
      .pipe(
        map((resp: any) => {
          producto.id = resp.name;
          return
        })
      );

  }

  actualizarProducto(producto: SolicitarProductoModel) {
    const productoTemp = {
      ...producto
    }
    delete productoTemp.id
    return this.http.put(`${this.url}productos/${producto.id}.json`, producto)
      .pipe(
        map((resp: any) => {
          producto.id = resp.name;
          return
        })
      );
  }

  borrarProducto(id:string){
    console.log(id)
    return this.http.delete(`${this.url}productos/${id}.json`);
  }

  getProductos() {
    return this.http.get(`${this.url}productos.json`).pipe(
      map(resp => this.crearArregloProductos(resp))
    )
  }

  private crearArregloProductos(productosObj: object) {
    if (productosObj === null) {
      return []
    }
    const productos: SolicitarProductoModel[] = [];
    Object.keys(productosObj).forEach(key => {
      const producto: SolicitarProductoModel = productosObj[key];
      producto.id = key;
      productos.push(producto);
    });
    return productos;

  }
}

