//modules
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';


//includes
import { Data } from '../includes/data';
 
@Injectable()
export class HttpService{


 
    constructor(private http: Http){ }

    getData(url: string) {
        return this.http.get(url);
    }

    getDate() {
        return this.http.get('/budget/getdate');
    }

    getMonth() {
        return this.http.get('/budget/getmonth');
    }

    getBottomstat() {
        return this.http.get('/budget/getbottomstat');
    }

    getTypes(section:string) {
        return this.http.get('/budget/gettypes?section='+section);
    }

    postAuth(strdata:any) {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/budget/auth', strdata, { headers: headers }).map((resp:Response)=>resp.json()).catch((error:any) =>{return Observable.throw(error);});
    }

    postCustom(strdata:any, url:string) {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(url, strdata, { headers: headers }).map((resp:Response)=>resp.json()).catch((error:any) =>{return Observable.throw(error);});
    }

    /*getService(url: string): Promise<any> {
        return this.http.get(url).toPromise().then((resp:Response)=>resp.json());
    }*/

    postData(data: Data){
        //const body = JSON.stringify(obj);
         
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'  });
        var params = new URLSearchParams();

        params.set('section', data.section);
        params.set('type', data.type);
        params.set('summa', data.summa);
        params.set('date', data.date);
        params.set('commentary', data.commentary);
        params.set('user', data.user);
         
        return this.http.post('/budget/recorddata', params.toString(), { headers: headers }).map((resp:Response)=>resp.json()).catch((error:any) =>{return Observable.throw(error);});
    }



}