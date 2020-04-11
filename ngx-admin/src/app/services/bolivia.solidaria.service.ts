import { Injectable, OnInit } from "@angular/core";
import { SmartTableData } from '../@core/data/smart-table';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn : 'root',
})

export class BoliviaSolidariaService extends SmartTableData implements OnInit {
 
    currentPosition = {lat : 0, lng : 0};

    constructor(private http : HttpClient) {
        super();
        this.showPosition();
    }

    ngOnInit(): void {
        this.showPosition();
    }
    
    showPosition () {

        console.log('onIniti');
        let detectPosition = (position)=> {
            this.currentPosition.lat = position.coords.latitude ;
            this.currentPosition.lng = position.coords.longitude ;

            console.log(this.currentPosition) ;

            return this.currentPosition ;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(detectPosition) ;
        }
    }

    getData(): any[] {
        throw new Error("Method not implemented.");
    }

    get position() {
        return {lat : this.currentPosition.lat, lng : this.currentPosition.lng} ;
    }

}