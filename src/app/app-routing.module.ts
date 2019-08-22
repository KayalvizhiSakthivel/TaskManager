import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent } from './user/user.component';
import {ProjectComponent} from './project/project.component';
//import { TaskComponent } from 'src/app/task/task.component';
import {TaskComponent} from 'src/app/task/task.component';
import { ViewTaskComponent } from 'src/app/view-task/view-task.component';
const routes: Routes = [
  {path:'users',component:UserComponent},
  {path:'projects',component:ProjectComponent},
  {path:'tasks',component:TaskComponent},
  {path:'viewTasks',component:ViewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UserComponent,ProjectComponent,TaskComponent]
