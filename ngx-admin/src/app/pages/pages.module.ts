import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { GoogleMapsModule } from '@angular/google-maps';
import {BoliviaSolidariaModule} from './bolivia-solidaria/bolivia.solidaria.module' ;
import { QuieroAyudarModule } from './quiero-ayudar/quiero.ayudar.module';
import { NecesitoAyudaModule } from './necesito-ayuda/necesito.ayuda.module';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    GoogleMapsModule,
    BoliviaSolidariaModule,
    QuieroAyudarModule,
    NecesitoAyudaModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
