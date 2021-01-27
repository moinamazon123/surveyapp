import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { SurveyComponent } from './pages/survey/survey.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ToggleButtonComponent } from './pages/toggle/toggle-button.component';
//import { SurveyPlayComponent } from './pages/survey-play/surveyplay.component';
import { LoginService } from './_services/login.service';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AuthComponent } from './pages/auth/signin/auth.component';
import { RegisterComponent } from './pages/auth/signup/register.component';

//import { NgxJsonViewerModule } from 'ngx-json-viewer';
//import { AceEditorModule } from 'ng2-ace-editor';
import { Ng5SliderModule } from 'ng5-slider';
import { SurveyPlayComponent } from './pages/survey-play/surveyplay.component';

import { SurveySliderComponent } from './pages/slider/slider.component';
import { RatingComponent } from './pages/rating/rating.component';

//import { NgxStarRatingModule } from 'ngx-star-rating';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbdRatingTemplate } from './pages/rating/rating.component';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    ToggleButtonComponent,
    SurveyPlayComponent,
    AuthComponent,
    RegisterComponent,
    SurveySliderComponent,
    RatingComponent
   // NgbdRatingTemplate
  ],
  imports: [
    BrowserModule,
   Ng5SliderModule,
    AppRoutingModule,
    LayoutModule,
    HttpModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,

   
   // NgbModule,
   
    //NgxJsonViewerModule,
    //AceEditorModule,
    
   // NgxStarRatingModule,
    ReactiveFormsModule
  ],
  
  providers: [ScriptLoaderService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

