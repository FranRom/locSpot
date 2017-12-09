import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

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
  city:"",
  phone:"",
  role:""

}
  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

  signup(formInfo){
    console.log(formInfo)
    const {username,lastname,email,password,city,phone,role} = this.formInfo;
    if(username != "" && password != ""){
      console.log(`Signup with ${username} ${password}`)
      this.auth.signup(username,lastname,email,password,city,phone,role)
      .subscribe(user => console.log(user))
//      .subscribe();
    } else{
      console.log("You must set a username and a password");
    }
  }

}
