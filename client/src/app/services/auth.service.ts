
import { Injectable, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

const BASEURL = environment.BASEURL + "/api/auth";

@Injectable()
export class AuthService {

  private user:object;
  private userLoginEvent:EventEmitter<any> = new EventEmitter<any>();
  private options = {withCredentials:true};

  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

    public getLoginEventEmitter():EventEmitter<any>{
      return this.userLoginEvent;
    }

    public getUser(){
      return this.user;
    }

    private emitUserLoginEvent(user){
      this.user = user;
      this.userLoginEvent.emit(user);
      return user;
    }

    private handleError(e) {
      console.log("AUTH ERROR");
      return Observable.throw(e.json().message);
    }

    signup(username,lastname,email,password,about,city,phone) {
      console.log("entrooooooo")
      console.log(username,lastname,email,password,about,city,phone)
      return this.http.post(`${BASEURL}/signup`, {username,lastname,email,password,about,city,phone}, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }

    login(username,password) {
      return this.http.post(`${BASEURL}/login`, {username,password}, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }

    // edit(id,user) {
    //   return this.http.put(`${BASEURL}/${id}/edit`,user, this.options)
    //   .map((res) =>res.json());
    // }

    logout() {
      return this.http.get(`${BASEURL}/logout`, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(null))
        .catch(this.handleError);
    }

    isLoggedIn() {
      return this.http.get(`${BASEURL}/loggedin`, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }
}
