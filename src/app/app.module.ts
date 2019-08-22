import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
import {DataTableModule} from "angular-6-datatable";
import { ProjectComponent } from './project/project.component';
import {ProjectService}from './project.service';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { TaskService } from 'src/app/task/task.service';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UserComponent,
    ProjectComponent,
    TaskComponent,
    ViewTaskComponent,
    UserComponent
   
  
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule ,
    HttpClientModule,
    DataTableModule
  ],
  providers: [UserService,ProjectService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
