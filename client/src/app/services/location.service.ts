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

  getListByID(id):Observable<any>{
      return this.http.get(`${BASEURL}/${id}`)
      .map(res => res.json());
  }

  deleteLocation(id){
      return this.http.delete(`${BASEURL}/${id}`)
                      .map(res => res.json());
  }

}
