import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { BoliviaSolidariaComponent } from './bolivia-solidaria/bolivia.solidaria.component';
import { QuieroAyudarComponent } from './quiero-ayudar/quiero.ayudar.component';
import { NecesitoAyudaComponent } from './necesito-ayuda/necesito.ayuda.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'content',
      component: BoliviaSolidariaComponent,
    },
    {
      path: 'quiero-ayudar',
      component: QuieroAyudarComponent,
    },
    {
      path: 'necesito-ayuda',
      component: NecesitoAyudaComponent,
    },
    {
      path: '**',
      component: BoliviaSolidariaComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
