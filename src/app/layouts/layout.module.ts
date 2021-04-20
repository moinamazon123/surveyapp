import{NgModule}from'@angular/core';
import {RouterModule}from '@angular/router';

import {LayoutComponent}from './layout.component';
import {AppHeader}from './app-header/app-header.component';
import {AppSidebar}from './app-sidebar/app-sidebar.component';
import {AppFooter }from './app-footer/app-footer.component';
import {AppBanner}from './app-banner/app-banner.component';
import {CommonModule}from '@angular/common';
import {BrowserModule}from '@angular/platform-browser'
import {SurveyPlayComponent}from '../pages/survey-play/surveyplay.component';
import {AppModule}from '../app.module';
import { CUSTOM_ELEMENTS_SCHEMA}from '@angular/compiler/src/core';

@NgModule({
declarations: [
LayoutComponent,

AppHeader,
AppSidebar,
AppFooter,
AppBanner,
],
exports: [
LayoutComponent,

AppHeader,
AppSidebar,
AppFooter,
AppBanner,
],
imports: [
RouterModule,
CommonModule,
BrowserModule



],

})
export class LayoutModule {
}
