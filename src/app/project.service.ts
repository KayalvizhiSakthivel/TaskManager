import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Project} from './project/project';
import {User} from './user/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 
      constructor(private http:HttpClient) {}
    
      private projectUrl = 'http://localhost:8088';
      prj:Project;



      public getProjects() {
       
        return this.http.get<Project[]>(this.projectUrl+"/viewProjects");
       }
       public getAProject(id) {
        return this.http.get<Project[]>(this.projectUrl+"/viewProject/"+id);
       }
       public deleteProject(project) {
           
         return this.http.post(this.projectUrl + "/deleteProject", project);
      }
    
      public addProject(project:Project):Observable<any> {      
        console.log('service ts====->'+ project);
        return this.http.post<Project>(this.projectUrl+"/addProject", project);
      }
      public updateProject(project:Project) {
         console.log(project);
         return this.http.put<Project>(this.projectUrl+"/updateProject", project);
       }
      
    
     
}
