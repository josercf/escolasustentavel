import { Http } from "../../../node_modules/@angular/http";
import { Injectable } from "../../../node_modules/@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class ActivityService{
    /**
     *
     */
    constructor(private http: Http) {

    }

    insert(activity: any){
        return this.http.post("/services/api/escola/", activity);
    }

    list(){
        return this.http.get("/services/api/escola")
            .map(res => res.json());
    }
}