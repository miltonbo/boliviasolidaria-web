import { Component, ViewChild, ElementRef } from '@angular/core';
import { GmapsComponent } from '../maps/gmaps/gmaps.component';
import { AyudaSolicitudRequest } from '../../data/request/solicitudes.request';
import { FormBuilder, Validators } from '@angular/forms';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService, NbToastrConfig, NbGlobalPosition } from '@nebular/theme';
import { BoliviaSolidariaService } from '../../services/bolivia.solidaria.service';
import { AyudaSolicitudResponse } from '../../data/response/ayuda.solicitud.response';
import { catchError } from 'rxjs/operators';

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
        ){}

    onEnviarSolicitud() {

        const size = this.file.size / 1024 ;

        if (size > 1024) {
            this.showToast('danger','Error','El archivo excede los 1MB permitidos.') ;
            return ;
        }

        console.log(this.map.selectedPosition().toJSON());

        const position = this.map.selectedPosition().toJSON() ; 

        this.request.lat = position.lat ;
        this.request.lng = position.lng ;

        this.service.realizarSolicitud(this.request)
            .subscribe(
                (response : AyudaSolicitudResponse )=> {
                    console.log(response ) ;
                },
                error => {
                    console.log(error) ;
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

        if (size < 1024){
            this.esImagenInValida = false ;
        } else {
            this.esImagenInValida  = true ;
            this.showToast('danger','Error','El archivo excede los 1MB permitidos.') ;
        }

        console.log(this.esImagenInValida);
    }


    private showToast(type: NbComponentStatus, title: string, body: string) {
        const config = {
          status: type,
          destroyByClick: this.destroyByClick,
          duration: this.duration,
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