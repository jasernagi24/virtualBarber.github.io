import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
constructor(private authService:AuthService,
  private router:Router){}

  salir()
  {
    this.authService.cerrarSesion();
    this.router.navigateByUrl('/login')
  }


  estaConectado(): boolean {
    if (this.authService.autenticado()) {
      return true;
    }
    else {
      return false;
    }
  }
}
