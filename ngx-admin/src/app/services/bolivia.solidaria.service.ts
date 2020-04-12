import { Injectable, OnInit } from "@angular/core";
import { SmartTableData } from '../@core/data/smart-table';
import { HttpClient } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import {environment} from '../../environments/environment.prod' ;
import { PuntosSolicitudesResponse } from '../data/response/solicitudes.response';

@Injectable({
    providedIn : 'root',
})

export class BoliviaSolidariaService extends SmartTableData implements OnInit {
 
    baseUrl = environment.urlWS ;

    currentPosition = {lat : 0, lng : 0};

    constructor(private http : HttpClient) {
        super();
    }

    ngOnInit(): void {
    }
    
    
    getData(): any[] {
        throw new Error("Method not implemented.");
    }

    getObtenerListaSolicitudes() {
        return this.http.get<PuntosSolicitudesResponse>(`${this.baseUrl}/solicitudes/puntos`)
        .pipe(
            retry(3),
            map((response: PuntosSolicitudesResponse) => {
                return response ;
            })
        );
    }


}