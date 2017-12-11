import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';


const BASEURL = environment.BASEURL + "/api/location";

@Injectable()
export class LocationService {
 private options = {withCredentials:true};
 constructor(private http: Http) {}

  getLocationList():Observable<any>{
   return this.http.get(`${BASEURL}/`, this.options)
   .map(res => res.json());
  }

  getLocationByID(id):Observable<any>{
   return this.http.get(`${BASEURL}/${id}`)
   .map(res => res.json());
  }

  deleteLocation(id){
   return this.http.delete(`${BASEURL}/${id}`)
   .map(res => res.json());
  }

  createLocation(){
   return this.http.post(`${BASEURL}/${id}/new`, {title,city,availability,price,photos}, this.options)
     .map(res => res.json())
     .map(user => this.emitUserLoginEvent(user))
     .catch(this.handleError);
  }
  }

}
