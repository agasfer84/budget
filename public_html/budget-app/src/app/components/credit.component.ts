//modules
import { Component, Injectable, OnChanges, OnInit, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NgModel} from '@angular/forms';
import { Response, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

//services
import { HttpService} from '../services/http.service';
import { ValidationService} from '../services/validation.service';
import { MessagesService} from '../services/messages.service';

//includes
import { Data } from '../includes/data';
import { Messages } from '../includes/messages';
import { Types } from '../includes/types';
import { Stat } from '../includes/stat';



@Component({
    selector: 'app_credit',
    templateUrl: './../templates/credit.component.html',
    providers: [HttpService, ValidationService, MessagesService],
})
export class CreditComponent implements OnInit {

    types = new Types();
    data = new Data();
    messages = new Messages();
    currdate: string;
    done: boolean = false;
    showDate:boolean = false;

    stat = new Stat();


    constructor(public httpService: HttpService, public validationService: ValidationService, public messagesService: MessagesService) {
    }

    ngOnInit() {
        this.data.section = "credit";
        this.httpService.getDate().subscribe((resp: Response) => {
            this.currdate = resp.json();
        });
        this.httpService.getTypes(this.data.section).subscribe((resp: Response) => {
            this.types.typesarray = resp.json();
            //console.log(this.types.typesarray);
        });


        this.httpService.getBottomstat().subscribe((resp: Response) => {
            this.stat = resp.json();
        });

        this.data.user = this.getCookie("user");

    }


    onConfirm() {
        this.httpService.postData(this.data).subscribe((mess) => {

                this.messages.messarray = mess;
                //console.log(this.messages.messarray);
                this.done = true;
                this.messagesService.messageMe(this.messages.messarray);

                this.httpService.getBottomstat().subscribe((resp: Response) => {
                    this.stat = resp.json();
                });
            },
            error => {
                this.messages.messarray = [['Ошибка! ' + error], ["error"]];
                this.messagesService.messageMe(this.messages.messarray);
            }
        );

    }

    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
}

