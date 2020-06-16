import { Injectable } from '@angular/core';
import { HomeModel } from '../modelos/home.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable()
export class HomeService {
  
  private url = "https://virtual-barber-2409.firebaseio.com/";

  constructor(private htttp: HttpClient) { }

  getHomes() {
    return this.htttp.get(`${this.url}home.json`).pipe(
      map(resp => this.crearArregloHome(resp))
    )
  }

  private crearArregloHome(homeObj: object) {
    if (homeObj === null) {
      return []
    }
    const homes: HomeModel[] = [];
    Object.keys(homeObj).forEach(key => {
      const home: HomeModel = homeObj[key];
      home.id = key;
      homes.push(home);
    });
    return homes;

  }
}