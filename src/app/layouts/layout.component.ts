import{Component, AfterViewInit, ViewEncapsulation}from '@angular/core';
import {Helpers}from "../helpers";
import {Router} from '@angular/router';
import {Location}from "@angular/common";

@Component({
selector: '.page-wrapper',
templateUrl: './layout.component.html',
encapsulation: ViewEncapsulation.None,
})

export class LayoutComponent implements AfterViewInit {

currentRoute:any;
constructor(private _router: Router,location: Location) {

    _router.events.subscribe(val => {
      if (location.path() != "") {
        this.currentRoute = location.path();
        console.log(this.currentRoute);

      }
      });
  }


  ngAfterViewInit() {

    // initialize layout: handlers, menu ...
    Helpers.initLayout();

  }

}
