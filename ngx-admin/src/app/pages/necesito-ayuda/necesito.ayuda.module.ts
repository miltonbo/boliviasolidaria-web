import { NgModule } from '@angular/core';
import { NbCardModule, NbCheckboxModule, NbInputModule, NbButtonModule, NbActionsModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsModule } from '../maps/maps.module';
import { NecesitoAyudaComponent } from './necesito.ayuda.component';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    MapsModule,
  ],
  exports: [
  ],
  declarations: [
      NecesitoAyudaComponent,
  ],
})
export class NecesitoAyudaModule { }
