import { NgModule } from '@angular/core';
import { NbCardModule, NbCheckboxModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { BoliviaSolidariaComponent } from './bolivia.solidaria.component';
import { MapsModule } from '../maps/maps.module';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbCheckboxModule,
    MapsModule,
  ],
  exports: [
  ],
  declarations: [
      BoliviaSolidariaComponent,
  ],
})
export class BoliviaSolidariaModule { }
