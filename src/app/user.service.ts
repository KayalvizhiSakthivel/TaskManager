import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user/user';




@Injectable()
export class UserService {

  constructor(private http:HttpClient) {}

  private userUrl = 'http://localhost:8088';
//	private userUrl = '/api';

   public getUsers() {
    return this.http.get<User[]>(this.userUrl+"/viewUsers");
   }
   public getAUser(id) {
    return this.http.get<User[]>(this.userUrl+"/viewUsers/"+id);
   }
   public deleteUser(user) {
       console.log(user)
     return this.http.post(this.userUrl + "/deleteUser", user);
  }

  public addUser(user) {
    console.log(user);
    return this.http.post<User>(this.userUrl+"/addUser", user);
  }


public updateUser(user) {
    return this.http.put(this.userUrl + '/updateUser', user);
  }

  
}
