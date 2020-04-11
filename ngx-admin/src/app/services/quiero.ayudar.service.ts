import { Injectable } from "@angular/core";
import { SmartTableData } from '../@core/data/smart-table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment.prod' ;
import { retry, catchError, map } from 'rxjs/operators';
import { ReceptoresDonacionResponse } from '../data/response/receptores.donacion.response';
import { PuntosAcopioResponse } from '../data/response/puntos.acopio.response';
@Injectable({
    providedIn : 'root',
})
export class QuieroAyudarService extends SmartTableData {
 
    baseUrl = environment.urlWS ;

    constructor(private http : HttpClient) {
        super();
    }
    
    getData(): any[] {
        throw new Error("Method not implemented.");
    }

    getReceptoresDonacion() {
        return this.http.get<ReceptoresDonacionResponse>(`${this.baseUrl}/receptores-donacion`)
        .pipe(
            retry(3),
            map((response: ReceptoresDonacionResponse) => {
                return response ;
            })
        );
    }

    getPuntosAcopio() {
        return this.http.get<PuntosAcopioResponse>(`${this.baseUrl}/puntos-acopio/puntos`)
        .pipe(
            retry(3),
            map((response: PuntosAcopioResponse) => {
                return response ;
            })
        );
    }

    private handleError(error: HttpErrorResponse) {}

}