import { Injectable } from '@angular/core';
import { UserDB } from '../../shared/fake-db/users';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class MemberService {
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
  
}
