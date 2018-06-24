import { Injectable } from '@angular/core';
import { UserDB } from '../../shared/fake-db/users';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class SessionService {
  items: any[];
  constructor(private http:HttpClient) {
       
  }
  
  //******* Implement your APIs ********
  getItems(): Observable<any> {
    return this.http.get(environment.apiURL+'/api/members');
  }
 
  addItem(item): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });    
    return this.http.post(environment.apiURL+'/api/members', item, {headers: headers});    
  } 

  updateItem(id, item): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });
    item.id=id;  
    return this.http.put(environment.apiURL+'/api/members/'+id, item, {headers: headers});    
  } 
  
  removeItem(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });
    return this.http.delete(environment.apiURL+'/api/members/'+id, {headers: headers});    
  } 
  
  logIn(item): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });    
    return this.http.post(environment.apiURL+'/api/Users/login', item, {headers: headers});    
  } 

  logOut(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    }); 
    
    let accessToken;
    if(localStorage.getItem('ngFuseToken')) {
        accessToken = JSON.parse(localStorage.getItem('ngFuseToken')).id;
    }
    console.log('accessToken for logout ::: '+accessToken);
    return this.http.post(environment.apiURL+'/api/Users/logout?access_token='+accessToken, null, {headers: headers});    
  } 

  isLoggedIn() {
    //console.log('localStorage ::: '+localStorage.getItem('ngFuseToken'));
    return localStorage.getItem('ngFuseToken') ? true : false;
  }

  
}
