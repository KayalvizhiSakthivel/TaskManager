import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { AddTaskService } from './add-task.service';
import {Task} from '../add-task/add-task.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  private task:Task;
  constructor(private fb:FormBuilder,private service : AddTaskService, private router:Router){}
  addTaskForm=this.fb.group({
    task:['',Validators.required],
    priority:['',Validators.required],
    parentTask:['',Validators.required],
    startDate:['',Validators.required],
    endDate:['',Validators.required]
  })
  // addTaskForm=new FormGroup({
  //   task: new FormControl(''),
  //   priority:new FormControl(''),
  //   parentTask:new FormControl(''),
  //   startdate:new FormControl(''),
  //   endDate:new FormControl('')
  // });
 

  ngOnInit() {
    this.task=this.service.output();
  }
  getTaskById(taskId: number) {
    this.service.getTaskById(taskId)
      .subscribe(
        (taskObj: Task) => this.updateTask(taskObj),
        (err: any) => console.log(err)
      );
  }

  updateTask(taskObj: Task) {
    console.log(taskObj);
    this.addTaskForm.patchValue({
      task: taskObj.task,
      priority: taskObj.priority,
      parentTask: taskObj.parentTask,

      startDate: taskObj.startDate,
      endDate: taskObj.endDate,

    });
  }
  onSubmit(){
    console.log(this.addTaskForm.value);
    this.service.addTask(this.addTaskForm.value)
    .subscribe(
      response=>console.log('Success!',response),
      error=>console.error('Error!',error)
      
    )
    
    this.router.navigate(['/viewTask']); 
  }
}
