import { Http } from "../../../node_modules/@angular/http";
import { User } from "../../models/user";
import { Injectable } from "../../../node_modules/@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    /**
     *
     */
    url: string = "http://localhost:61879";
    constructor(private http: Http) {

    }

    insert(user: User){
       
        this.url = "/services";
        return this.http.post(this.url +"/api/user/", user);
    }

    signIn(email: string, password: string){
        return this.http.post(this.url +"/api/user/auth", {Email: email, Password: password});
    }
}