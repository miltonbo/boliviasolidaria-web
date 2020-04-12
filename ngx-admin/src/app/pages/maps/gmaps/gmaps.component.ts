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

  position = { lat: 0, lng: 0 };

  punto: PuntosAcopioResponse = new PuntosAcopioResponse() ;

  @Input() center : google.maps.LatLng ;

  constructor() {

    const geolocationSuccess = (position ) => {
      var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
      this.center = userLatLng;
  
      this.map.center = userLatLng ;
  
      console.log(this.map.center) ;
    }

    console.log('hola');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocationSuccess, this.geolocationError);
    }
  }

  geolocationError(error) {
    console.log(error) ;
  }

  

  writeAddressName(latLng) {

  }

  openInfoWindow(marker,p){
    this.infoWindow.open(marker);
    this.punto = p ;
  }

}
