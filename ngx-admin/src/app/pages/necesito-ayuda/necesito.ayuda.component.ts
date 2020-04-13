import { Component, ViewChild, ElementRef } from '@angular/core';
import { GmapsComponent } from '../maps/gmaps/gmaps.component';
import { AyudaSolicitudRequest } from '../../data/request/solicitudes.request';
import { FormBuilder, Validators } from '@angular/forms';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService, NbToastrConfig, NbGlobalPosition } from '@nebular/theme';
import { BoliviaSolidariaService } from '../../services/bolivia.solidaria.service';
import { AyudaSolicitudResponse } from '../../data/response/ayuda.solicitud.response';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'ngx-necesito-ayuda',
    templateUrl: './necesito.ayuda.component.html',
    styleUrls: ['./necesito.ayuda.scss'],
})
export class NecesitoAyudaComponent {

    config: NbToastrConfig;

    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'primary';
    
    esImagenInValida = true ;
    file : File ;

    request: AyudaSolicitudRequest = new AyudaSolicitudRequest();

    @ViewChild("txtImgDoc") txtImgDoc: ElementRef;

    @ViewChild(GmapsComponent, { static: false }) map: GmapsComponent;

    formAyuda = this.formBuilder.group({
        nombre : ['', Validators.required],
        direccion: ['', Validators.required],
        necesidad: ['', Validators.required] ,
        contacto: ['', Validators.required],
        ci: ['',Validators.required],
        imagen: ['',Validators.required],
    });

    constructor(private formBuilder: FormBuilder, 
        private toastrService: NbToastrService,
        private service : BoliviaSolidariaService,
        private router : Router,
        ){}

    onEnviarSolicitud() {

        const size = this.file.size / 1024 ;

        if (size > 1024) {
            this.showToast('danger','Error','El archivo excede los 1MB permitidos.') ;
            return ;
        }

        console.log(this.map.selectedPosition());

        const position = this.map.selectedPosition().toJSON() ; 

        this.request.lat = position.lat ;
        this.request.lng = position.lng ;

        this.service.realizarSolicitud(this.request)
            .subscribe(
                (response : AyudaSolicitudResponse )=> {
                    this.service.enviarImagen(response, this.file)
                        .subscribe((response)=> {
                            this.router.navigate([environment.index], {queryParams : {solicitud : 'ok'} }) ;
                        }, 
                            error => {
                                console.log(error)
                                this.service.showToast('danger','Error', error.error.mensaje) ;
                            }
                        ) ;
                },
                error => {
                    console.log(error)
                    this.service.showToast('danger','Error', error.error.mensaje) ;
                }
            )

        console.log(this.map.selectedPosition().toJSON());
        console.log(this.txtImgDoc);
        console.log(this.request) ;
    }

    onUploadFile(fileEvent) {
        const file = fileEvent.target.files[0];
        const size = file.size / 1024 ;

        console.log(size);
        this.file = fileEvent.target.files[0];

        if (size < 10240){
            this.esImagenInValida = false ;
        } else {
            this.esImagenInValida  = true ;
            this.service. showToast('danger','Error','El archivo excede los 10 MB. permitidos.') ;
        }

        console.log(this.esImagenInValida);
    }
    
    get nombre () {
        return this.formAyuda.get('nombre');
    }

    
    get direccion () {
        return this.formAyuda.get('direccion');
    }

    
    get necesidad () {
        return this.formAyuda.get('necesidad');
    }

    
    get contacto () {
        return this.formAyuda.get('contacto');
    }

    
    get ci () {
        return this.formAyuda.get('ci');
    }

    
    get imagen () {
        return this.formAyuda.get('imagen');
    }

}