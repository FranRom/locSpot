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
    picture:""
  }

  feedback: string;

  constructor() { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
     this.feedback = JSON.parse(response).message;
   };

   this.uploader.onErrorItem = (item, response, status, headers) => {
     this.feedback = JSON.parse(response).message;
   };
 }

//  addTags(tag) {
//   this.newLocation.tags.push(tag);
// }

  josue(){
  this.uploader.uploadAll();
  this.uploader.onCompleteItem =  () => console.log("Done")
}
  submit(){
    this.uploader.onBuildItemForm = (file, form) => {
       form.append('title', this.newLocation.title);
       form.append('city', this.newLocation.city);
       form.append('availability', this.newLocation.availability);
       form.append('price', this.newLocation.price);
     };

       this.uploader.uploadAll();
       this.uploader.onCompleteItem =  () => console.log("Done")


   }
 }
