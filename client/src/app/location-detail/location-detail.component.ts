import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  location:any;
  constructor(
    public router:Router,
    public locationService:LocationService,
    public route:ActivatedRoute) {
    route.params.subscribe(params => {
      this.locationService.getLocationByID(params['id'])
       .subscribe(location => this.location = location);
    })
  }

  deleteLocation(id){
    this.locationService.deleteLocation(id).subscribe(() =>{
      this.router.navigate(['']);
    });
  }

  ngOnInit() {
  }

}
