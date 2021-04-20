import{Component, OnInit, AfterViewInit, NgModule}from '@angular/core';
import {ScriptLoaderService}from '../../_services/script-loader.service';
import {Router}from '@angular/router';
import { LoginService}from '../../_services/login.service';
import { SurveyService}from '../../_services/survey.service';
import { Users}from '../../model/user';
import {Survey} from '../../model/survey';
import {SurveyComponent}from '../survey/survey.component';
import {SurveyPlayComponent}from '../survey-play/surveyplay.component';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit, AfterViewInit {

userCount:number;
totSurveyCount:number;
totSubmittedSurvey:number;
assgnedSurveyList = [];
userid:number;
surveyToPlay:Survey = new Survey();
surveyPlayFlag = false;
userList:Users[]= [];
userFlag = false;
surveyFlag = false;
mySurveyFlag = false;

constructor(private _script: ScriptLoaderService,
     private loginService: LoginService,
     private surveyService:SurveyService,
     private router : Router) { }

  ngOnInit() {
    //if(localStorage.getItem("username")!=null){
      this.router.navigate(['/index']);
   /* } else{
      this.router.navigate(['/auth']);
    } */
    this.loadDashboardData();

  }

  loadDashboardData(){

      this.getUsers();
      this.getAllsurveys();
      this.getSubmittedSurvey();
      this.getAssignedSurvey();

  }

  getUserDetails(){
    this.userFlag=true;
    this.surveyFlag = false;
  }
  getSurveyStats(){
    this.surveyFlag = true;
    this.userFlag=false;

  }
  getMySurveyList(){
    this.mySurveyFlag = true;


  }
  getAssignedSurvey(){

    this.userid = Number(localStorage.getItem("userid"));

    this.surveyService.getAssignSurveyByUserId(this.userid).subscribe(res=>{
        this.assgnedSurveyList = res.json();
        console.log( this.assgnedSurveyList)

    },error=>{

    })


  }

  getUsers(){

    this.loginService.getUsers().subscribe(res=>{
      console.log(res.json())
      this.userList = res.json();
      this.userCount = res.json().length;

    },error=>{

    })


  }
  getAllsurveys(){
this.surveyService.surveyList().subscribe(res=>{
  this.totSurveyCount = res.json().length;

},error=>{

})

  }

  getSubmittedSurvey(){
    this.surveyService.totSubmittedSurveyList().subscribe(res=>{
      console.log(res.json());
        this.totSubmittedSurvey = res.json();
    },error =>{

    })
  }
 surveyPlay(survey){
   this.surveyPlayFlag=true;
   this.surveyToPlay = survey;
 }

  ngAfterViewInit() {
    this._script.load('./assets/js/scripts/dashboard_1_demo.js');
  }

}
