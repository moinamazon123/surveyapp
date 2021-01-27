import { Component, OnInit,  NgModule, AfterViewInit, OnDestroy } from '@angular/core';

import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../_services/login.service';
import { Users } from '../../../model/user';
import { Router } from '@angular/router';


declare var $:any;


@NgModule({
 
  imports: [FormsModule]
  
})
@Component({
  selector: 'auth-login',
  templateUrl: './auth.component.html',
  
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy {

    user:Users = new Users();
    errMsg:string;
    isLoginProgress=false;
    successLogin:boolean;
    signInGroup: FormGroup;
    constructor(private loginService : LoginService,private fb: FormBuilder,private router: Router)  { 

      this.signInGroup = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]

      })
    }
  
    ngOnInit() {
      $('body').addClass('empty-layout bg-silver-300');
      
      if(sessionStorage.getItem("username")!=null){
        this.router.navigate(['/index']);
      } else{
        this.router.navigate(['/auth']);
      }
      

    }

  
    onSubmit(){
      console.log((this.user.username,this.user.password));
     // this.login();
    }
    login(){
      this.isLoginProgress = true;
      this.loginService.login(this.user.username,this.user.password).subscribe(res=>{
      
        //console.log(JSON.parse(res['_body']).accessToken);
        console.log(JSON.parse(res['_body'])['accessToken']);
      
        localStorage.setItem("token", JSON.parse(res['_body'])['accessToken'] );
        this.isLoginProgress = false;
        this.errMsg = null;
        this.loginService.validateToken(JSON.parse(res['_body'])['accessToken']).subscribe( res=>{
          console.log(res);
         
          if(res['_body']){
           // sessionStorage.setItem("username",this.user.username);
           sessionStorage.setItem("username",this.user.username);
          //  this.router.navigate['/index'];
            this.router.navigate(['/index']);//.then(s =>location.reload());;
          }
     
         } , error => {
          
         })
      
         
    } , error => {
      this.isLoginProgress = false;
      this.errMsg = error['_body'];
      console.log(error);
    });
    }
  validateToken(token: any) {
  let flag;
    this.loginService.validateToken(token).subscribe( res=>{
     console.log(res);
     flag = res['_body'];

    } , error => {
      flag = error['_body'];
    })
    this.successLogin = flag;
  return flag;
  }
    ngAfterViewInit() {
      $('#login-form').validate({
          errorClass: "help-block",
          rules: {
              email: {
                  required: true,
                  email: true
              },
              password: {
                  required: true
              }
          },
          highlight: function(e) {
              $(e).closest(".form-group").addClass("has-error")
          },
          unhighlight: function(e) {
              $(e).closest(".form-group").removeClass("has-error")
          },
      });
    }
  
    ngOnDestroy() {
      $('body').removeClass('empty-layout bg-silver-300');
    }
  
  }
  function setWithExpiry(key, value, ttl) {
    const now = new Date()
  
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }