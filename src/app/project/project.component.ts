import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user/user';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Project } from 'src/app/project/project';
import { ProjectService } from '../project.service'


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  userModel: User;
  projectModel: Project;
  user: User = new User();
  public users: User[];
  obj: User;
  projects:Project[];
  public sample = new Project();

  example = { userId: null, firstName: null, lastName: null, employeeId: null };

  constructor(private fb: FormBuilder, private projectService: ProjectService, private userService: UserService) { }
  exampleproject = { projectId: null, projectName: null, startDate: null, endDate: null, manager: { userId: null, firstName: null, lastName: null, employeeId: null }, suspended: null };
  exampleproject1 = { projectId: null, projectName: null, startDate: null, endDate: null, manager: { userId: null, firstName: null, lastName: null, employeeId: null }, suspended: null };

  ngOnInit() {

    this.projectService.getProjects()

      .subscribe(
      data => this.projects = data
      )
  }
  loadTable() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  addProjectForm = this.fb.group({

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
    suspended: '',
    numberOfTasks: '',
    completedTasks: ''
  })



  selectManager(user) {

    this.userModel = user;
    this.example = {
      userId: this.userModel.userId,
      firstName: this.userModel.firstName,
      lastName: this.userModel.lastName,
      employeeId: this.userModel.employeeId
    };
    this.addProjectForm.patchValue
      (
      {
        manager: user
      }
      );
    // this.exampleproject = {
    //   projectId: this.projectModel.projectId,
    //   projectName: this.projectModel.projectName,
    //   startDate: this.projectModel.startDate,
    //   endDate: this.projectModel.endDate,
    //   manager: this.projectModel.manager,
    //   suspended:this.projectModel.suspended
    // };

    //  console.log(user);

  }

  prj: Project;



  onSubmit() {

    console.log(this.addProjectForm.value);

    this.projectService.addProject(this.addProjectForm.value).subscribe(result => {
      alert("Project created successfully.");
      console.log(result);
    });
  }




  suspendProject(data) {

    this.projectModel = data;
    this.exampleproject = {
      projectId: this.projectModel.projectId,
      projectName: this.projectModel.projectName,
      startDate: this.projectModel.startDate,
      endDate: this.projectModel.endDate,
      manager: this.projectModel.manager,
      suspended: this.projectModel.suspended
    };

    this.example = {
      userId: this.projectModel.manager.userId,
      firstName: this.projectModel.manager.firstName,
      lastName: this.projectModel.manager.lastName,
      employeeId: this.projectModel.manager.employeeId
    };

    this.addProjectForm.patchValue
      (
      {
        suspended: true
      }
      );
    this.addProjectForm.patchValue
      (
      {
        projectId: this.projectModel.projectId
      }
      );
    this.addProjectForm.patchValue
      (
      {
        projectName: this.projectModel.projectName
      }
      );
    this.addProjectForm.patchValue
      (
      {
        startDate: this.projectModel.startDate
      }
      );
    this.addProjectForm.patchValue
      (
      {
        endDate: this.projectModel.endDate
      }
      );
    this.addProjectForm.patchValue
      (
      {
        priority: this.projectModel.priority
      }
      );

    this.addProjectForm.patchValue
      (
      {
        manager: this.projectModel.manager
      }
      );

    console.log(this.addProjectForm.value)
    this.onSubmit();
  }
  updateProject(data) {



    this.projectModel = data;
    this.exampleproject = {
      projectId: this.projectModel.projectId,
      projectName: this.projectModel.projectName,
      startDate: this.projectModel.startDate,
      endDate: this.projectModel.endDate,
      manager: this.projectModel.manager,
      suspended: this.projectModel.suspended
    };

    this.example = {
      userId: this.projectModel.manager.userId,
      firstName: this.projectModel.manager.firstName,
      lastName: this.projectModel.manager.lastName,
      employeeId: this.projectModel.manager.employeeId
    };



  }
  filterdata:[];
  
search(term: string) {
  if(!term) {
    this.projects = this.filterdata;
  } else {
    this.projects = this.projects.filter(x => 
      x.projectId.toString().trim().toLowerCase().includes(term.trim().toLowerCase())||
       x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
       x.startDate.toString().trim().includes(term.trim().toLowerCase()) ||
       x.endDate.toString().trim().includes(term.trim().toLowerCase() ) ||
       x.priority.toString().trim().toLowerCase().includes(term.trim().toLowerCase()) ||
       x.manager.firstName.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
       x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase())
       
    );
  }
}
}
