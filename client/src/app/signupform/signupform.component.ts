import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {
formInfo = {
  username:"",
  lastname:"",
  email:"",
  password:"",
  about:"",
  city:"",
  phone:""

}
  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

  signup(formInfo){
    console.log(formInfo)
    const {username,lastname,email,password,about,city,phone} = this.formInfo;
    if(username != "" && password != ""){
      console.log(`Signup with ${username} ${password}`)
      this.auth.signup(username,lastname,email,password,about,city,phone)
      .map(user => console.log(user))
      .subscribe();
    } else{
      console.log("You must set a username and a password");
    }
  }

}
