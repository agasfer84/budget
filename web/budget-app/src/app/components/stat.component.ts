//modules
import { Component, Injectable, OnInit } from '@angular/core';
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
import { Messages } from '../includes/messages';
import { Types } from '../includes/types';
import { Stat } from '../includes/stat';



@Component({
    selector: 'app_stat',
    templateUrl: './../templates/stat.component.html',
    providers: [HttpService, ValidationService, MessagesService],
})

export class StatComponent implements OnInit {

    types = new Types();
    messages = new Messages();
    currdate:string;
    done:boolean = false;
    stat = new Stat();
    showall:boolean = false;
    pieChartDataCredit:any;
    pieChartDataDebet:any;

    constructor(private httpService: HttpService, private validationService: ValidationService, private messagesService: MessagesService){}

    ngOnInit(){
        this.httpService.getMonth().subscribe((resp: Response) => {this.currdate=resp.json();});
        this.httpService.getData('/budget/stat').subscribe((resp: Response) => {
            this.stat.monthstatarr=resp.json();
            //console.log(this.stat.monthstatarr);
        });
        this.httpService.getData('/budget/allstat').subscribe((resp: Response) => {
            this.stat.allstatarr=resp.json();
            console.dir(this.stat.allstatarr);

            var arr_credit=this.stat.allstatarr[0]["credit"];
            var arr_debet=this.stat.allstatarr[0]["debet"];
            var newarr_credit=[];
            var newarr_debet=[];

            arr_credit.forEach(function(item, i, arr_credit) {
                newarr_credit[0]=['typename','sum'];
                newarr_credit[i+1]=[item.typename,Number(item.sum)];
            });
            arr_debet.forEach(function(item, i, arr_debet) {
                newarr_debet[0]=['typename','sum'];
                newarr_debet[i+1]=[item.typename,Number(item.sum)];
            });
            //console.log(newarr_credit);
            this.pieChartDataCredit =  {
                chartType: 'PieChart',
                dataTable: newarr_credit,
                options: {'title': 'Расходы',
                    is3D: true,
                },
            };
            this.pieChartDataDebet =  {
                chartType: 'PieChart',
                dataTable: newarr_debet,
                options: {'title': 'Доходы',
                    is3D: true,
                },
            };

        });


    }

    showAllPeriods(){
        if(this.showall){this.showall=false;}
        else{this.showall=true;}
    }
}
