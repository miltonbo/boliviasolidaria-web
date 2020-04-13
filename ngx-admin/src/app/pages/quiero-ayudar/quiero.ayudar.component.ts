import { Component, OnInit } from '@angular/core';
import { QuieroAyudarService } from '../../services/quiero.ayudar.service';
import { ReceptoresDonacionResponse } from '../../data/response/receptores.donacion.response';
import { BoliviaSolidariaService } from '../../services/bolivia.solidaria.service';
import { PuntosAcopioResponse } from '../../data/response/puntos.acopio.response';

@Component({
    selector : 'ngx-quiero-ayudar',
    templateUrl: './quiero.ayudar.component.html',
    styleUrls: ['./quiero.ayudar.scss'],
})
export class QuieroAyudarComponent implements OnInit {

    center = {lat : -17, lng : -64};
    receptor ;
    puntosAcopio ;

    constructor (
        private boliviaService : BoliviaSolidariaService,
        private service : QuieroAyudarService,
        ) {

        }

    
    ngOnInit(): void {
        this.service.getReceptoresDonacion()
            .subscribe((response : ReceptoresDonacionResponse)=>{
                this.receptor = response ;
            })

        this.service.getPuntosAcopio()
            .subscribe((response :PuntosAcopioResponse)=> this.puntosAcopio = response) 
    }

}