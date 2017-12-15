import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css']
})

export class NewLocationComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  tags = [];
  real = [];

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
      this.real.push(value.trim());
      console.log(this.real)
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: any): void {
    let index = this.tags.indexOf(tag);
    this.real.splice(-1,1)
    console.log(this.real)
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/location/addPhoto'
  });

  newLocation = {
    title:"",
    city:"",
    availability:"",
    price:"",
    about:"",
    tags:[]
  }

  photo = [];

  feedback: string;

  constructor(public location:LocationService) { }

  ngOnInit() {}

//  addTags(tag) {
//   this.newLocation.tags.push(tag);
// }

onUploadFinished(e){
  //console.log(e.file)
  this.photo[e.file.url] = e.serverResponse._body.slice(1, -1);;
  //console.log("FILE", e.serverResponse._body);
  //console.log("PHOTO", this.photo);
  this.photo.push(e.serverResponse._body.slice(1, -1))
}
onRemoved(e){
  delete this.photo[e.file.name];
  //console.log(this.photo);
}

submit(newLocation){
  console.log("newLocation: " + newLocation);
  console.log(this.tags);

  const {title,city,availability,price,about} = this.newLocation;
  const photo = this.photo;
  const tags = this.real;

  //console.log("this.newlocation: " + this.newLocation)

  if(title != "" && city != "" && availability != "" && price != ""){

    this.location.newLocation(title,city,availability,price,about,tags,photo)
    .map(location => console.log(location))
    .subscribe();
    this.photo=[];

  console.log("this.location.newLocation" + this.location.newLocation);

  } else{
    console.log("You must fill all the form fields");
  }
}
}
