import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
})
export class AppHeader implements AfterViewInit,OnInit {

  loggdInUser:string;

  constructor(private router : Router
  ) { }
  ngOnInit(): void {
    this.loggdInUser = sessionStorage.getItem("username");
    console.log(sessionStorage.getItem("username"));
  }

  logout(){
    sessionStorage.removeItem("username");
    this.router.navigate(['/auth']);
  }

  ngAfterViewInit()  {
	}

}
