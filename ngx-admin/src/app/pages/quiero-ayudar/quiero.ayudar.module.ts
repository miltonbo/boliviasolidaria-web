import { NgModule } from '@angular/core';
import { NbCardModule, NbCheckboxModule, NbInputModule, NbButtonModule, NbActionsModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsModule } from '../maps/maps.module';
import { QuieroAyudarComponent } from './quiero.ayudar.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    NbTabsetModule,
    GoogleMapsModule,
    MapsModule,
  ],
  exports: [
  ],
  declarations: [
      QuieroAyudarComponent,
  ],
})
export class QuieroAyudarModule { }
