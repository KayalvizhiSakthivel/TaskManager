import { User } from "src/app/user/user";

export class Project{
    projectId:number;
    projectName:String;
    startDate:Date;
    endDate:Date;
    priority:number;
    manager:User;
    suspended:boolean;
    numberOfTasks:number;
	completedTasks:number;
}
