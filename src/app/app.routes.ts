import {RouterModule,Routes} from '@angular/router';
import { CuerpoComponent } from './componentes/cuerpo/cuerpo.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AboutComponent } from './componentes/about/about.component';
import { SolicitarCitaComponent } from './componentes/solicitar-cita/solicitar-cita.component';
import { AdministrarCitaComponent } from './componentes/administrar-cita/administrar-cita.component';
import { TiendaProductoComponent } from './componentes/tienda-producto/tienda-producto.component';
import { EstilosCortesComponent } from './componentes/estilos-cortes/estilos-cortes.component';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { AgregarCorteComponent } from './componentes/agregar-corte/agregar-corte.component';
import { Route } from '@angular/compiler/src/core';
import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES:Routes = [
    {path:'home', component:CuerpoComponent, },
    {path:'login', component:LoginComponent},
    {path:'registro', component:RegistroComponent},
    {path:'about', component:AboutComponent},
    {path:'solicitarCita', component:SolicitarCitaComponent, canActivate:[AuthGuard]},
    {path:'administrarCita', component:AdministrarCitaComponent, canActivate:[AuthGuard]},
    {path:'tiendaProducto', component:TiendaProductoComponent, canActivate:[AuthGuard]},
    {path:'estilosCortes', component:EstilosCortesComponent, canActivate:[AuthGuard]},
    {path:'agregarProducto', component:AgregarProductoComponent, canActivate:[AuthGuard]},
    {path:'agregarCorte', component:AgregarCorteComponent, canActivate:[AuthGuard]},
    {path:'estilosCortes/:id',component:EstilosCortesComponent},
    {path:'**', pathMatch:'full', redirectTo:'home'},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);