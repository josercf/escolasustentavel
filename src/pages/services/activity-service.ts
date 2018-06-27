import { Http } from "../../../node_modules/@angular/http";
import { Injectable } from "../../../node_modules/@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class ActivityService{
    /**
     *
     */
    url: string = "http://localhost:61879";
    constructor(private http: Http) {

    }

    insert(activity: any){
         this.url = "/services";
        return this.http.post(this.url+ "/api/escola/", activity);
    }

    list(){
        this.url = "/services";
        return this.http.get(this.url+ "/api/escola/")
            .map(res => res.json());
    }
}