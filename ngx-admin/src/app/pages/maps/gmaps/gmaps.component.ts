import { Component, ViewChild, Input } from '@angular/core';
import { MapInfoWindow, GoogleMap } from '@angular/google-maps';
import { PuntosAcopioResponse } from '../../../data/response/puntos.acopio.response';
import { BoliviaSolidariaService } from '../../../services/bolivia.solidaria.service';
import { AyudaSolicitudRequest } from '../../../data/request/solicitudes.request';
import { AyudaSolicitudResponse } from '../../../data/response/ayuda.solicitud.response';

@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  templateUrl: './gmaps.component.html',
})
export class GmapsComponent {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  @Input() puntosAcopio: any[];
  acopioOption = { icon: 'assets/images/blue-pin-43.59.png' };
  @Input() puntosAyuda: any[];
  ayudaOption = { icon: 'assets/images/red-pin-43.59.png' };
  @Input() puntosZonas: any[];
  zonaOption = { icon: 'assets/images/green-pin-43.59.png' };

  @Input() showSolicitudes: boolean;
  @Input() showAcopio: boolean;
  @Input() showZonas: boolean;

  position: google.maps.LatLng;

  punto: PuntosAcopioResponse;
  persona: AyudaSolicitudResponse;

  @Input() center: google.maps.LatLng;

  @Input() enableClick: boolean = false;

  constructor(private service: BoliviaSolidariaService) {

    const geolocationSuccess = (position) => {
      var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.center = userLatLng;
      this.position = userLatLng;
      this.map.center = userLatLng;

      alert(userLatLng.toJSON());

    }

    

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocationSuccess, this.geolocationError);
    }else {
      alert('Geolocation is not supported')
    }
  }

  geolocationError(error) {
    alert(error.message);
  }

  onClickMap(event) {
    if (this.enableClick) {
      this.position = new google.maps.LatLng(event.latLng.toJSON().lat, event.latLng.toJSON().lng)
      console.log(this.position);
      //this.position = event.latLng.toJSON() ;
    }
  }

  selectedPosition(): any {
    return this.position;
  }

  openInfoWindow(marker, p) {
    this.persona = undefined ;
    
    this.infoWindow.open(marker);
    this.punto = p;
  }

  openAyudaInfo(marker, s) {
    this.punto = undefined ;

    this.service.getObtenerDetalleSolicitud(s.id)
      .subscribe((response: AyudaSolicitudResponse) => {
        console.log(response);
        this.persona = response;
        this.infoWindow.open(marker);
      })
  }

}
