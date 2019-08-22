import { Component, OnInit } from '@angular/core';
import {FormBuilder}from '@angular/forms';
import { UserService } from '../user.service';
import {User} from './user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  public users : User[];
  searchModel;
  userModel:User;
  filterData:[];

 user:User=new User();
  constructor(private fb:FormBuilder, private userService:UserService) { }
 

  example = {userId:null,firstName: null,lastName: null,employeeId:null};
  addUserForm=this.fb.group({
   
    firstName:[''],
    lastName:[''],
    employeeId:['']
  })

  editUserForm=this.fb.group({
    userId:[],
    firstName:[''],
    lastName:[''],
    employeeId:['']
  })

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users =this.searchModel= data;
      });
 };



 closeEdit()
 {
  console.log("End Task");
  this.ngOnInit();
 }



  deleteUser(user: User): void {
    
    this.userService.deleteUser(user)
      .subscribe( data => {
        alert("User deleted successfully.");
       
        
      });
  };

  onSubmit(){
    console.log(this.addUserForm.value);
    console.log("hi")
    this.userService.addUser(this.addUserForm.value)
    .subscribe( data => {
      alert("User created successfully.");
    });
   

  
  }


  updateUser(user){
    this.userModel =user;  
    this.example = {userId:this.userModel.userId,firstName: this.userModel.firstName, lastName: this.userModel.lastName, employeeId: this.userModel.employeeId};
    
  
  
    }
    finishUpdate(user){
      this.userService.updateUser(user)
      .subscribe( data => {
        alert("User updated successfully")
        
      });
    }

  

    search(term: string) {
      if(!term) {
        this.users = this.filterData;
      } else {
        this.users = this.users.filter(x => 
          x.userId.toString().trim().toLowerCase().includes(term.trim().toString().toLowerCase())||
           x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
           x.lastName.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
           x.employeeId.toString().trim().toLowerCase().includes(term.toString().trim().toLowerCase())
        );
      }
    }

}