import { Component , OnInit } from '@angular/core';
import { AddTaskService } from 'src/app/add-task/add-task.service';
import { FormBuilder,Validators} from '@angular/forms';
// import {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Manager';
}
