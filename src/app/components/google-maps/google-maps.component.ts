import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom : 14,
    disableDefaultUI: true,
 }
 marker = {
    position: { lat: 38.9987208, lng: -77.2538699 },
 }

  constructor() { }

  ngOnInit(): void {
  }

}
