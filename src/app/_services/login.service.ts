import { Injectable } from '@angular/core';

import {Router} from '@angular/router';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { Users } from '../model/user';



@Injectable()
export class LoginService {
  private serverPath:string = 'http://localhost:8080';//AppConst.serverPath;



  constructor(private http:Http, private router:Router) { }

  sendCredential(username: string, password: string) {


  	let url = this.serverPath+'/api/auth/signin';
    let encodedCredentials = btoa(username+":"+password);
    localStorage.setItem('loginUser',username);
  	let basicHeader = "Basic "+encodedCredentials;
  	let headers = new Headers({
  		'Content-Type' : 'application/x-www-form-urlencoded',
  		'Authorization' : basicHeader
  	});

  	return this.http.get(url, {headers: headers});
  }


  login(username: string, password: string) {


    let url = this.serverPath+'/api/auth/signin';
  let credentials = new Object();
  credentials["username"]= username;
  credentials["password"] = password;
  let headers = new Headers({
    'Content-Type' : 'application/json'
   
});

    return this.http.post(url,JSON.stringify(credentials),{headers: headers});
}

signup(user:Users){

  let url = this.serverPath+'/api/auth/signup';
  let headers = new Headers({
    'Content-Type' : 'application/json'
   
});

    return this.http.post(url,JSON.stringify(user),{headers: headers});

}

validateToken(token: string) {

  let url = this.serverPath+'/api/auth/validateToken/'+token;
  

    return this.http.get(url);

   
}
}