import { NgModule } from '@angular/core';
import { NbCardModule, NbCheckboxModule, NbInputModule, NbButtonModule, NbActionsModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsModule } from '../maps/maps.module';
import { NecesitoAyudaComponent } from './necesito.ayuda.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MapsModule,
  ],
  exports: [
  ],
  declarations: [
      NecesitoAyudaComponent,
  ],
})
export class NecesitoAyudaModule { }
