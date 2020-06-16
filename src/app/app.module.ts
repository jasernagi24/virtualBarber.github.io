import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//rutas
import { APP_ROUTING } from './app.routes';

//servicios
import {HomeService} from './servicios/home.service'

//componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/shared/header/header.component';
import { FooterComponent } from './componentes/shared/footer/footer.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CuerpoComponent,
    LoginComponent,
    RegistroComponent,
    AboutComponent,
    SolicitarCitaComponent,
    AdministrarCitaComponent,
    TiendaProductoComponent,
    EstilosCortesComponent,
    AgregarProductoComponent,
    AgregarCorteComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
