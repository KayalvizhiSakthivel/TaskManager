import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user/user';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Project } from '../project/project';
import { ProjectService } from '../project.service';
import {Task} from '../task/task';
import { Router } from '@angular/router';
import { ParentTask } from 'src/app/task/ParentTask';
import { TaskService } from 'src/app/task/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
tasks:Task[];
parentTasks:ParentTask[];
task:Task;
errorMsg:any;
public taskModel:Task;
public projects:Project[];
projectModel: Project;
parentModel:ParentTask;
users:User[];
exampleproject = { projectId: null, projectName: null, startDate: null, endDate: null, manager: { userId: null, firstName: null, lastName: null, employeeId: null }, suspended: null  };
example = { userId: null, firstName: null, lastName: null, employeeId: null };
userModel:User;
exampleParent={id:null,parentTaskName:null};
exampleTask={
              taskId:null,project:{ projectId: null, projectName: null, startDate: null,
              endDate: null, manager: { userId: null, firstName: null, lastName: null,
              employeeId: null },
              suspended: null},task:null,priority:null,parentTask:{
              id:null,parentTaskName:null},startDate: null,
              endDate: null,user: { userId: null, firstName: null, lastName: null,
              employeeId: null },numberOfTasks:null
              };
 

  constructor(private fb:FormBuilder,private router: Router, private parentTaskService: TaskService, private projectService: ProjectService, private userService: UserService,private taskService: TaskService) { }

  ngOnInit() {
     this.taskService.getTasks().subscribe(
    data => this.tasks = data,
    error => this.errorMsg = error);
    this.projectService.getProjects().subscribe(
      data => this.projects = data,
      error => this.errorMsg = error);
      this.taskService.getParentTasks().subscribe(
        data => this.parentTasks = data,
        error => this.errorMsg = error);
  
        this.userService.getUsers().subscribe(
          data => this.users = data,
          error => this.errorMsg = error);

  }

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
            parentTaskName:['']
    
          }),
          startDate: [''],
          endDate: [''],
          user: this.fb.group({
            userId: [''],
            employeeId: [''],
            firstName: [''],
            lastName: ['']
    
          }),
          numberOfTasks:[''],
          suspended:['']
        })
        onSubmit() {
          this.addTaskForm.patchValue
          (
          {
            taskId: this.exampleTask.taskId,
           
          }
          );
           this.taskService.addTask(this.addTaskForm.value)
           .subscribe(
             response => console.log('Success',response),
           );
       
         }
    


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
            suspended: true
          }
          );
        }
      
        end(task){
        this.taskModel=task;

        this.exampleTask={
          taskId:this.taskModel.taskId,
          project:this.taskModel.project,
          task:this.taskModel.task,
          priority:this.taskModel.priority,
          parentTask:this.taskModel.parentTask,
          startDate: this.taskModel.startDate,
          endDate: this.taskModel.endDate,
          user: this.taskModel.user,
          numberOfTasks:this.taskModel.numberOfTasks
          };
     



          this.addTaskForm.patchValue({
            taskId:this.exampleTask.taskId
          })
          this.addTaskForm.patchValue({
            task:this.exampleTask.task
          })
          this.addTaskForm.patchValue({
            project:this.exampleTask.project
          })
          this.addTaskForm.patchValue({
            user:this.exampleTask.user
          })
          this.addTaskForm.patchValue({
            startDate:this.exampleTask.startDate
          })
          this.addTaskForm.patchValue({
            endDate:this.exampleTask.endDate
          })
          this.addTaskForm.patchValue({
            priority:this.exampleTask.priority
          })
          this.addTaskForm.patchValue({
            parentTask:this.exampleTask.parentTask
          })
          this.addTaskForm.patchValue({
            startDate:this.exampleTask.startDate
          })
          this.addTaskForm.patchValue({
            numberOfTasks:1
          })
          this.addTaskForm.patchValue({
            suspended:true
          })



          this.onSubmit();
        }

filterdata:[];

        search(term: string) {
          if(!term) {
            this.tasks = this.filterdata;
          } else {
            this.tasks = this.tasks.filter(x => 
             //  x.project.projectName.trim().toLowerCase().includes(term.trim().toLowerCase())||
               x.task.trim().toLowerCase().includes(term.trim().toLowerCase())||
               x.priority.toString().trim().toLowerCase().includes(term.trim().toLowerCase()) 
              //  x.parentTask.parenttaskname.trim().toLowerCase().includes(term.trim().toLowerCase())||
              //  x.user.firstName.trim().toLowerCase().includes(term.trim().toLowerCase())
                );
          }
        
        }





      updateTask(taskObject){
        console.log("hi");
        

        this.taskModel = taskObject;
        
        
        this.exampleproject = {
          projectId: this.taskModel.project.projectId,
          projectName: this.taskModel.project.projectName,
          startDate: this.taskModel.project.startDate,
          endDate: this.taskModel.project.endDate,
          manager: this.taskModel.project.manager,
          suspended:this.taskModel.project.suspended
        };
    
        this.example = {
          userId: this.taskModel.user.userId,
          firstName: this.taskModel.user.firstName,
          lastName: this.taskModel.user.lastName,
          employeeId: this.taskModel.user.employeeId
        };
    
this.exampleTask={
              taskId:this.taskModel.taskId,
              project:this.taskModel.project,
              task:this.taskModel.task,
              priority:this.taskModel.priority,
              parentTask:this.taskModel.parentTask,
              startDate: this.taskModel.startDate,
              endDate: this.taskModel.endDate,
              user: this.taskModel.user,
              numberOfTasks:this.taskModel.numberOfTasks
              };
         
this.exampleParent={
            id:taskObject.parentTask.id,
            parentTaskName:taskObject.parentTask.parentTaskName

              };



              console.log(this.exampleTask.project.projectName)
//       this.exampleTask={
//         taskId:taskObject.taskId,project:{ projectId: taskObject.project.projectId, projectName: taskObject.project.projectName, startDate: taskObject.project.startDate,
//         endDate: taskObject.project.endDate, manager: { userId: taskObject.project.manager.userId, firstName: taskObject.project.manager.firstName, lastName: taskObject.project.manager.lastName,
//         employeeId: taskObject.project.manager.employeeId },
//         suspended: taskObject.project.suspended},task:taskObject.task,priority:taskObject.priority,parentTask:{
//         id:taskObject.parentTask.id,parentTaskName:taskObject.parent.parentTaskName},startDate: taskObject.startDate,
//         endDate: taskObject.endDate,user: { userId: taskObject.user.userId, firstName:  taskObject.user.firstName, lastName:  taskObject.user.lastName,
//         employeeId:  taskObject.user.employeeId },numberOfTasks:taskObject.numberOfTasks
//         };
 
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
