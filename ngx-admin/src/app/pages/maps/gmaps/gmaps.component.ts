import { Component, ViewChild, Input } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { PuntosAcopioResponse } from '../../../data/response/puntos.acopio.response';

@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  templateUrl: './gmaps.component.html',
})
export class GmapsComponent {
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  @Input() puntosAcopio : any [] ;

  position = { lat: 0, lng: 0 };

  punto: PuntosAcopioResponse = new PuntosAcopioResponse() ;

  @Input() center ={ lat: 0, lng: 0 };

  constructor() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }

  showPosition(p ) {
    this.center = {lat : p.coords.latitude, lng : p.coords.longitude} ;
    this.position = {lat : p.coords.latitude, lng : p.coords.longitude} ;
  }

  openInfoWindow(marker,p){
    this.infoWindow.open(marker);
    this.punto = p ;
  }

}
