import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment.prod' ;
import { PuntosSolicitudesResponse } from '../data/response/solicitudes.response';
import { AyudaSolicitudRequest } from '../data/request/solicitudes.request';
import { AyudaSolicitudResponse } from '../data/response/ayuda.solicitud.response';
import 'rxjs/add/operator/catch';
import { NbToastrService, NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';

@Injectable({
    providedIn : 'root',
})
export class BoliviaSolidariaService {
 
    baseUrl = environment.urlWS ;

    currentPosition = {lat : 0, lng : 0};

    config: NbToastrConfig;

    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'primary';

    constructor(private http : HttpClient, 
        private toastrService: NbToastrService,) {}
    

    showToast(type: NbComponentStatus, title: string, body: string, duration?) {
        const config = {
          status: type,
          destroyByClick: this.destroyByClick,
          duration: duration ? 3000 : duration,
          hasIcon: this.hasIcon,
          position: this.position,
          preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? `. ${title}` : '';
    
        this.index += 1;
        this.toastrService.show(
          body,
          `Toast ${this.index}${titleContent}`,
          config);
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

        let headers = new HttpHeaders().set('Content-Type','application/json')
            //.set('Access-Control-Request-Method', 'POST')
           // .set('Access-Control-Request-Headers', 'content-type')
        ;

        return this.http.post<AyudaSolicitudResponse>(`${this.baseUrl}/solicitudes`, request, {headers : headers})
            .pipe(
                retry(3),
                map((response: AyudaSolicitudResponse)=> {
                    return response ;
                }), 
            )
    }

    enviarImagen(request: AyudaSolicitudResponse, file) {

        const formData = new FormData();
        formData.append('foto',file) ;
        formData.append('key','foto') ;

        return this.http.post<AyudaSolicitudResponse>(`${this.baseUrl}/solicitudes/${request.id}/ci-foto`, formData )
            .pipe(
                retry(3),
                map((response: AyudaSolicitudResponse)=> {
                    return response ;
                }), 
            )
    }



}