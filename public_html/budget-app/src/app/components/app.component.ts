//models
import { Component, Injectable, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { Response, Headers, URLSearchParams} from '@angular/http';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NgModel} from '@angular/forms';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

//includes
//import { Data } from '../includes/data';

export class Auth {
  login:string;
  password:string;
  user:string;
  hash:string;
}

//services
import { HttpService} from '../services/http.service';
import { ValidationService} from '../services/validation.service';


@Component({
  selector: 'app',
  templateUrl: './../templates/app.component.html',
  providers: [HttpService, ValidationService],
  styleUrls: []
})
export class AppComponent implements OnInit {
  auth = new Auth();
  authorized: boolean = false;
  notify:string;
  isLoading: boolean = false;
  isChecked: boolean = false;
  constructor(private httpService: HttpService, private validationService: ValidationService){}

  ngOnInit(){

    this.auth.hash = this.getCookie("hash");
    this.auth.user = this.getCookie("user");
    this.auth.login = this.getCookie("user");

    this.Login();

    //console.log(this.authorized);

  }

  isDisabled(login, password){
    if(!login || !password) {return true;}
    else {return false;}
  }

  Login(){
    this.notify="";
    this.isLoading = true;
    const body = JSON.stringify(this.auth);
    this.httpService.postAuth(body).subscribe((data) => {
      this.authorized=data;
      console.log(data);
      this.isLoading = false;
      if (this.authorized){
        this.auth.user = this.auth.login;
        if(!this.auth.hash||!this.auth.user){
          var date = new Date(new Date().getTime() + 24 * 3600 * 1000);
          document.cookie = "hash="+data+"; path=/; expires=" + date.toUTCString();
          document.cookie = "user="+this.auth.login+"; path=/; expires=" + date.toUTCString();
        }

      }
      else{
          this.notify = "Неверный логин или пароль";
      }
    }, error => {
      this.isLoading = false;
      this.notify="Ошибка отправки данных";});
  }

  Submit(){return this.isChecked = true;}

  Logout(){
    document.cookie = "hash=0; path=/; expires=-1";
    document.cookie = "user=; path=/; expires=-1";
    return this.authorized=false;
  }

  getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

}
