import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css']
})

export class NewLocationComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/location/addPhoto'
  });

  newLocation = {
    title:"",
    city:"",
    availability:"",
    price:"",

  }
  photo = [];

  feedback: string;

  constructor(public location:LocationService) { }

  ngOnInit() {}

//  addTags(tag) {
//   this.newLocation.tags.push(tag);
// }

onUploadFinished(e){
  this.photo[e.file.name] = e.serverResponse._body.slice(1, -1);;
  console.log("FILE", e.serverResponse._body);
  console.log("PHOTO", this.photo);
}
onRemoved(e){
  delete this.photo[e.file.name];
  console.log(this.photo);
}

submit(newLocation){
  console.log("newLocation: " + newLocation);
  const {title,city,availability,price} = this.newLocation;
  const photo = this.photo;

  if(title != "" && city != "" && availability != "" && price != ""){

    this.location.newLocation(title,city,availability,price,photo)
    .map(location => console.log(location))
    .subscribe();
    this.photo=[];
    
  } else{
    console.log("You must fill all the form fields");
  }
}
}
