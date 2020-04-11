import { Component, OnInit } from "@angular/core";
import { ViewChild } from '@angular/core';
import { BoliviaSolidariaService } from '../../services/bolivia.solidaria.service';
/// <reference types="@types/googlemaps" />

@Component({
    selector: 'ngx-bolivia-solidaria',
    templateUrl: './bolivia.solidaria.component.html',
    styleUrls: ['./bolivia.solidaria.scss'],
})
export class BoliviaSolidariaComponent implements OnInit {
    readonly position = { lat: 51.678418, lng: 7.809007 };

    constructor (private service: BoliviaSolidariaService) {
        
    }

    ngOnInit(): void {
        
    }

}