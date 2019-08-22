import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user/user';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Project } from '../project/project';
import { ProjectService } from '../project.service';
import {Task} from './task';
import { Router } from '@angular/router';
import { ParentTask } from 'src/app/task/ParentTask';
import { TaskService } from 'src/app/task/task.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private fb:FormBuilder,private router: Router, private parentTaskService: TaskService, private projectService: ProjectService, private userService: UserService,private taskService: TaskService) { }
  public taskModel: Task =new Task();
  public projects:Project[];
  projectModel: Project;
  parentModel:ParentTask;
  users:User[];
 
  parentTasks:ParentTask[];
  exampleproject = { projectId: null, projectName: null, startDate: null, endDate: null, manager: { userId: null, firstName: null, lastName: null, employeeId: null }, suspended: null  };
  example = { userId: null, firstName: null, lastName: null, employeeId: null };
  userModel:User;
  
  exampleTask={
                taskId:null,project:{ projectId: null, projectName: null, startDate: null,
                endDate: null, manager: { userId: null, firstName: null, lastName: null,
                employeeId: null },
                suspended: null},task:null,priority:null,parentTask:{
                id:null,parentTask:null},startDate: null,
                endDate: null,manager: { userId: null, firstName: null, lastName: null,
                employeeId: null },numberOfTasks:null
                };
   exampleParent={id:null,parentTask:null};
  addTaskForm = this.fb.group({

      taskId:'',
        project: this.fb.group({
        projectId: '',
        projectName: [''],
        startDate: [''],
        endDate: [''],
        priority: [''],
        manager: this.fb.group({
          userId: [''],
          employeeId: [''],
          firstName: [''],
          lastName: ['']

        }),
        suspended: ''

      }),
      task:[''],
      priority:[''],

      parentTask:this.fb.group({
        id:'',
        parentTaskName:"no value",

      }),
      startDate: [''],
      endDate: [''],
      user: this.fb.group({
        userId: [''],
        employeeId: [''],
        firstName: [''],
        lastName: ['']

      }),
      numberOfTasks:['']
    })



    
    // public taskDatas=[];

     public errorMsg;
    // public data;

    // public usersList: any
    // public select: User

    // public projectsList: any
    // public selectpro: Project

    // public parentsList: any
    // public selectparent: ParentTask




  ngOnInit() {
  // this.gettasks()
  //  this.userService.getUsers().subscribe(
  //       data => this.usersList = data,
  //       error => this.errorMsg = error);

  this.projectService.getProjects().subscribe(
    data => this.projects = data,
    error => this.errorMsg = error);
    this.taskService.getParentTasks().subscribe(
      data => this.parentTasks = data,
      error => this.errorMsg = error);

      this.userService.getUsers().subscribe(
        data => this.users = data,
        error => this.errorMsg = error);

  // this.parentTaskService.getParentTasks().subscribe(
  //   data => this.projectsList = data,
  //   error => this.errorMsg = error);
  }

   onSubmit() {
   
    this.taskService.addTask(this.addTaskForm.value)
    .subscribe(result =>{
      alert("Project created successfully.");
      console.log(result);
   });

  }

  //  onSubmit(data) {

  //  this.taskModel=data

  //     console.log(this.taskModel)
  //       this.taskService.addTask(this.taskModel)
  //        .subscribe(
  //          response => console.log('Success!', response),
  //        )
  //        this.taskModel  =new Task();
  //        this.router.navigateByUrl('/pagenotfound', {skipLocationChange: true}).then(()=>
  //        this.router.navigate(["/viewtask"]));
  //    }



  // gettasks() {
  //   this.taskService.getTasks()
  //   .subscribe(data=> this.taskDatas= data,
  //   error=> this.errorMsg=error);
  // console.log(this.taskDatas)
  // }


  selectProject(data){
    this.projectModel = data;
    this.exampleproject = {
      projectId: this.projectModel.projectId,
      projectName: this.projectModel.projectName,
      startDate: this.projectModel.startDate,
      endDate: this.projectModel.endDate,
      manager: this.projectModel.manager,
      suspended:this.projectModel.suspended
    };
    this.addTaskForm.patchValue
    (
    {
      project: data
    }
    );
    this.example = {
      userId: this.projectModel.manager.userId,
      firstName: this.projectModel.manager.firstName,
      lastName: this.projectModel.manager.lastName,
      employeeId: this.projectModel.manager.employeeId
    };
  }


  selectParent(parent:ParentTask){

    

    this.addTaskForm.patchValue
    (
    {
      parentTask: parent
    }
    );
  }



  selectManager(userinstance){
    
      console.log(userinstance);
      this.userModel=userinstance;

      this.example = {
        userId: this.userModel.userId,
        firstName: this.userModel.firstName,
        lastName: this.userModel.lastName,
        employeeId: this.userModel.employeeId
      };

        this.addTaskForm.patchValue
        (
        {
          user:userinstance
        }
        );
      }
  
  }


