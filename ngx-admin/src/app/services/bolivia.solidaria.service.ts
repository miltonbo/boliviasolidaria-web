import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment.prod' ;
import { PuntosSolicitudesResponse } from '../data/response/solicitudes.response';
import { AyudaSolicitudRequest } from '../data/request/solicitudes.request';
import { AyudaSolicitudResponse } from '../data/response/ayuda.solicitud.response';
import 'rxjs/add/operator/catch';

@Injectable({
    providedIn : 'root',
})
export class BoliviaSolidariaService {
 
    baseUrl = environment.urlWS ;

    currentPosition = {lat : 0, lng : 0};

    constructor(private http : HttpClient) {}
    
    
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

    realizarSolicitud(request: AyudaSolicitudRequest) {

        return this.http.post<AyudaSolicitudResponse>(`${this.baseUrl}/solicitudes`, request)
            .pipe(
                retry(3),
                map((response: AyudaSolicitudResponse)=> {
                    return response ;
                }), 
            )
    }



}