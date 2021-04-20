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
    this.loggdInUser = localStorage.getItem("username");
    console.log(localStorage.getItem("username"));
  }

  logout(){
    localStorage.removeItem("username");
    this.router.navigate(['/auth']);
  }

  ngAfterViewInit()  {
	}

}
