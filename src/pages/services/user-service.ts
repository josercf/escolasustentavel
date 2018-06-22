import { Http } from "../../../node_modules/@angular/http";
import { User } from "../../models/user";
import { Injectable } from "../../../node_modules/@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    /**
     *
     */
    constructor(private http: Http) {

    }

    insert(user: User){
        return this.http.post("http://localhost:61879/api/user/", user);
    }
}