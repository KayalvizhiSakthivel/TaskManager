import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Project} from 'src/app/project/project';
import {User} from 'src/app/user/user';
import {Task} from 'src/app/task/task'
import {ParentTask} from 'src/app/task/ParentTask'
@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
      constructor(private http:HttpClient) {}
    
      private taskUrl = 'http://localhost:8088';
      



      public getTasks() {
       
        return this.http.get<Task[]>(this.taskUrl+"/viewTasks");
       }
     
       public deleteTask(task) {
           
         return this.http.post(this.taskUrl + "/deleteProject", task);
      }
    
      public addTask(task) {

        console.log(task);
        return this.http.post<Task>(this.taskUrl+"/addTask", task);
      }
     
      public getParentTasks() {
        
         return this.http.get<ParentTask[]>(this.taskUrl+"/viewParentTasks");
        }
    
     
}
