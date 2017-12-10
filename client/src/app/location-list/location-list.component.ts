import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  location:Array<any> = [];
  constructor(public locationService:LocationService) {
  this.locationService.getLocationList().subscribe( list =>{
  this.location = list;
});

}

ngOnInit() {
}

}
