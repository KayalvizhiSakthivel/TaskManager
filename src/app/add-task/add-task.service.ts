import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Task} from '../add-task/add-task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  private task:Task;

   taskUrl: string = 'http://localhost:8181';
  //private taskUrl = '/api';
  constructor( private _http:HttpClient) {
    
   }

   public getTask() {
    return this._http.get<Task[]>(this.taskUrl);
  }

  public getTaskById(taskId: number):Observable<any> {
    return this._http.get<Task>(`${this.taskUrl}/${taskId}`);
  }


  addTask(taskData):Observable<any> {
    return this._http.post(`${this.taskUrl}` + `/addTask`, taskData);
  }

  // addTask(taskSet):Observable<any>
  // {
  //    return this._http.post('${this.taskUrl}',taskSet)
  // }
  
    public updateTask() {
    return this._http.get<Task[]>(this.taskUrl+ '/');
  }

  deleteTask(taskId: number) {
    return this._http.delete(this.taskUrl + '/' + taskId);
  }

  input(task:Task)
  {
    console.log(Task);
    this.task=task;
  }
  output()
  {
    return this.task;
  }

  
}
