import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import {Helpers} from "./helpers";
import { Location } from "@angular/common";

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  currentRoute: string;
  constructor(private _router: Router,location: Location) {

	_router.events.subscribe(val => {
		if (location.path() != "") {
		  this.currentRoute = location.path();
		  console.log(this.currentRoute);
		} else {
		  this.currentRoute = "Home";
		}
	  });
}

  

  ngOnInit() {
	 
	if(sessionStorage.getItem("username")!=null){
	console.log(this.currentRoute);
	if(this.currentRoute ==='/survey') {
		this._router.navigate([this.currentRoute]);
	}
	  } else{
		this._router.navigate(['/auth']);
	  }
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
