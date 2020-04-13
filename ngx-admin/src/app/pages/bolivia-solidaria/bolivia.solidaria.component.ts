import { Component, OnInit } from "@angular/core";
import { ViewChild } from '@angular/core';
import { BoliviaSolidariaService } from '../../services/bolivia.solidaria.service';
import { PuntosSolicitudesResponse } from '../../data/response/solicitudes.response';
import { QuieroAyudarService } from '../../services/quiero.ayudar.service';
import { PuntosAcopioResponse } from '../../data/response/puntos.acopio.response';
import { ActivatedRoute } from '@angular/router';
/// <reference types="@types/googlemaps" />

@Component({
    selector: 'ngx-bolivia-solidaria',
    templateUrl: './bolivia.solidaria.component.html',
    styleUrls: ['./bolivia.solidaria.scss'],
})
export class BoliviaSolidariaComponent implements OnInit {
    readonly position = { lat: 51.678418, lng: 7.809007 };

    puntosAyuda : any  ;
    puntosAcopio : any;

    constructor (private service: BoliviaSolidariaService,
                private quieroService: QuieroAyudarService,
                private route: ActivatedRoute
        ) {
        
    }

    ngOnInit(): void {
        this.onClickSolicitudes(true) ;

        if (this.route.snapshot.queryParamMap.get('solicitud')){
                this.service.showToast('success','Genial','Su Solicitud ha sido enviada!', 4000);
        }
    }

    onClickSolicitudes(value){
        if(value) {
            this.service.getObtenerListaSolicitudes()
                .subscribe((response:PuntosSolicitudesResponse)=>{
                    this.puntosAyuda = response ;
                })
        } else {
            this.puntosAyuda = [] ;
        }
    }

    onClickCentrosAcopio(value){
        if(value) {
            this.quieroService.getPuntosAcopio()
                .subscribe((response: PuntosAcopioResponse)=>{
                    this.puntosAcopio = response ;
                })
        }else {
            this.puntosAcopio = [] ;
        }
    }

    onClickZonas(value){

    }

}