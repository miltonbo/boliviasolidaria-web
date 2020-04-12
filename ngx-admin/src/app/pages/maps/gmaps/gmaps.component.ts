import { Component, ViewChild, Input } from '@angular/core';
import { MapInfoWindow, GoogleMap } from '@angular/google-maps';
import { PuntosAcopioResponse } from '../../../data/response/puntos.acopio.response';

@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  templateUrl: './gmaps.component.html',
})
export class GmapsComponent {
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;

  @Input() puntosAcopio : any [] ;
  acopioOption = {icon : 'assets/images/blue-pin-43.59.png'}  ;
  @Input() puntosAyuda : any [] ;
  ayudaOption = {icon : 'assets/images/red-pin-43.59.png'}  ;
  @Input() puntosZonas : any [] ;
  zonaOption = {icon : 'assets/images/green-pin-43.59.png'}  ;

  @Input() showSolicitudes : boolean ;
  @Input() showAcopio : boolean ;
  @Input() showZonas : boolean ;

  position : google.maps.LatLng ;

  punto: PuntosAcopioResponse = new PuntosAcopioResponse() ;

  @Input() center : google.maps.LatLng ;

  @Input() enableClick : boolean = false;

  constructor() {

    const geolocationSuccess = (position ) => {
      var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
      this.center = userLatLng;
      this.position = userLatLng ;
      this.map.center = userLatLng ;
  
      console.log(this.map.center) ;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocationSuccess, this.geolocationError);
    }
  }

  geolocationError(error) {
    console.log(error) ;
  }

  onClickMap (event) {
    if (this.enableClick) {
      this.position = event.latLng.toJSON() ;
    }
  }
  
selectedPosition () : any {
  return this.position ;
}

  openInfoWindow(marker,p){
    this.infoWindow.open(marker);
    this.punto = p ;
  }

}
