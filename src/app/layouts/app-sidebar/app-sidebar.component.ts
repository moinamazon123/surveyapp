import { Component } from '@angular/core';

@Component({
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {
  loggdInUser:string;
  ngOnInit() {
    this.loggdInUser = localStorage.getItem("username");

  }
}
