//modules
import { Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NgModel} from '@angular/forms';
import { Response, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
//import {MdDialog} from '@angular/material/typings/dialog';

//services
import { HttpService} from '../services/http.service';
import { ValidationService} from '../services/validation.service';
import { MessagesService} from '../services/messages.service';

//includes
import { Data } from '../includes/data';
import { Messages } from '../includes/messages';
import { Types } from '../includes/types';



@Component({
    selector: 'app_top',
    templateUrl: './../templates/top.component.html',
    providers: [HttpService, ValidationService, MessagesService],
})
export class TopComponent implements OnInit {

    types = new Types();
    data = new Data();
    messages = new Messages();
    currdate: string;
    done: boolean = false;
    topdata: string[];
    remove_id:number;


    constructor(private httpService: HttpService, private validationService: ValidationService, private messagesService: MessagesService) {
    }

    ngOnInit() {

        this.list();

    }


    onConfirm(data: Data) {
        this.httpService.postData(this.data).subscribe((mess) => {

                this.messages.messarray = mess;

                this.done = true;

                this.messagesService.messageMe(this.messages.messarray);


            },
            error => {

                this.messages.messarray = [['Ошибка! ' + error], ["error"]];

                this.messagesService.messageMe(this.messages.messarray);
            }
        );

    }

    openDialog(id){
            var eldialog = document.getElementById("dialog");
            eldialog.classList.remove("nodisplay");
            eldialog.classList.add("shadow");
            this.remove_id = id;

    }

    closeDialog() {
        var eldialog = document.getElementById("dialog");
        eldialog.classList.remove("shadow");
        eldialog.classList.add("nodisplay");
    }

    Remove(){
        //console.log(this.remove_id);

        const url="/budget/remove";
        const body = JSON.stringify({'id':this.remove_id});

        this.httpService.postCustom(body, url).subscribe((data) => {
            this.done=data;
            this.closeDialog();

            if (this.done){
                this.messages.messarray = [['Запись удалена'],["success"]];
                this.messagesService.messageMe(this.messages.messarray);
                this.list();
            }
            else{
                this.messages.messarray = [['Запись не удалена'],["error"]];
                this.messagesService.messageMe(this.messages.messarray);
            }
        }, error => {
            this.messages.messarray = [['Ошибка! '+error],["error"]];
            this.messagesService.messageMe(this.messages.messarray);
        });

    }

    list(){
        this.httpService.getData('/budget/top').subscribe((resp: Response) => {
        this.topdata=resp.json();
        //console.log(this.topdata);
    });}

}
