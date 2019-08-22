import { Project } from "src/app/project/project";
import { User } from "src/app/user/user";
import { ParentTask } from "src/app/task/ParentTask";

export class Task{
    taskId:number;
    project:Project;
    task:String;
    priority:number;
    parentTask:ParentTask;
    startDate:Date;
    endDate:Date;
    user:User;
    numberOfTasks:number;
    suspended:boolean;
}
