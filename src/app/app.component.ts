import { Component, OnInit, AfterViewInit, ViewEncapsulation}from '@angular/core';
import {Router, NavigationStart, NavigationEnd}from '@angular/router';
import {Helpers}from "./helpers";
import {Location}from "@angular/common";
import {SurveyService }from './_services/survey.service';

@Component({
selector: 'body',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css'],
encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit, AfterViewInit {
title = 'app';
currentRoute: string;
constructor(private _router: Router,location: Location,private surveyService:SurveyService) {

	_router.events.subscribe(val => {
		if (location.path() != "") {
		  this.currentRoute = location.path();
		  console.log(this.currentRoute);
		} else {
		  this.currentRoute = "Home";
		}
	  });
}

/* checktoken(token){

    let flag;
    this.surveyService.validateToken(token).subscribe( res=>{

     flag = res['_body'];
	 console.log(flag,token);
	 if(flag === 'false'){
		 console.log("Session Expired");
		 this._router.navigate(['/auth']);
	 }

    } , error => {
      flag = error['_body'];
    })

  return flag;

   } */


  ngOnInit() {

	/*if(this.checktoken(localStorage.getItem("token"))!=='false'){
	console.log(this.currentRoute);
	console.log("session is active")
	if(this.currentRoute ==='/survey') {
		this._router.navigate([this.currentRoute]);
	}
	  } else{
		  console.log("your session is expired")
		this._router.navigate(['/auth']);
	  } */
		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				Helpers.setLoading(true);
				Helpers.bodyClass('fixed-navbar');
			}
			if (route instanceof NavigationEnd) {
				window.scrollTo(0, 0);
				Helpers.setLoading(false);

				// Initialize page: handlers ...
				Helpers.initPage();
			}

		});
  }

  ngAfterViewInit() {}

}
