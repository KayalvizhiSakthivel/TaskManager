import { Component, OnInit } from '@angular/core';
import {Task} from '../add-task/add-task.model';
import {AddTaskComponent} from '../add-task/add-task.component'
import { FormBuilder,Validators} from '@angular/forms';
import { AddTaskService } from '../add-task/add-task.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  taskModel
  searchModel;
 

  example = {taskId:null,task: null, priority: null, parentTask: null,startDate: null,endDate:null };

    constructor( private fb: FormBuilder,private service: AddTaskService,private _router: Router) {
        
    }
    addTaskForm = this.fb.group({
      taskId: [],
      task: ['', Validators.required],
      priority: ['', Validators.required],
      parentTask: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    ngOnInit() {
       this.service.getTask()
         .subscribe( data => {
           this.tasks =this.searchModel= data;
         });
    };
  

  // editButtonClick(taskId: number) {
  //   this._router.navigate(['/task', taskId])
  // }
  
click(task){
  console.log("hello");
  console.log(task.isDisabled);
  task.isDisabled=true;
  console.log(task.isDisabled);
 }

 closeEdit()
 {
  console.log("End Task");
  this.ngOnInit();
 }

  updateTask(task){
    console.log("hi");
    this.taskModel =task;
    
    
     this.example = {taskId:this.taskModel.taskId,task: this.taskModel.task, priority: this.taskModel.priority, parentTask: this.taskModel.parentTask,startDate: this.taskModel.startDate,endDate:this.taskModel.endDate };
    
  }
  

  onSubmit() {
    console.log(this.addTaskForm.value);
    this.service.addTask(this.addTaskForm.value)
      .subscribe(
      response => console.log('success', response),
      error => console.error('Error!', error)
      );
  }
  Task(data: string) {
    if(!data) {
      this.tasks = this.searchModel;
    } else {
      this.tasks = this.tasks.filter(x => 
         x.task.trim().toLowerCase().includes(data.trim().toLowerCase()) 
        
      );
    }
  }
  parentTask(data: string) {
    if(!data) {
      this.tasks = this.searchModel;
    } else {
      this.tasks = this.tasks.filter(x => 
         x.parentTask.trim().toLowerCase().includes(data.trim().toLowerCase()) 
        
      );
    }
  }
  priorityFrom(data: number) {
    console.log (data)
    if(!data ) {
      this.tasks = this.searchModel;
    } else {
      this.tasks = this.tasks.filter(x => 
    
       x.priority.toString().trim().toLowerCase().includes(data.toString().trim().toLowerCase())
       
          
      );
    }
  }


  priorityTo(data: number) {
    console.log (data)
    if(!data ) {
      this.tasks = this.searchModel;
    } else {
      this.tasks = this.tasks.filter(x => 
     
       x.priority.toString().trim().toLowerCase().includes(data.toString().trim().toLowerCase())
        
      );
    }
  }

  // deleteTask(task1: Task): void {
  //   this.service.deleteTask(task1.taskId)
  //     .subscribe( data => {
  //       this.tasks = this.tasks.filter(u => u !== task1);
  //     })
  // };


}
