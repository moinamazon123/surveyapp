import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private _script: ScriptLoaderService, private router : Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("username")!=null){
      this.router.navigate(['/index']);
    } else{
      this.router.navigate(['/auth']);
    }

  }

  ngAfterViewInit() {
    this._script.load('./assets/js/scripts/dashboard_1_demo.js');
  }

}
