import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {


    _keyPressSumma(event: any) {
        var pattern = /[0-9\.]/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    _keyPressDate(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    isDisabled(type:string, summa:string) { if (type&&summa) {return false;}
    else {return true;}
    }

    getSign(s:number){
        if (s>0){return "+";}
        else if (s<0) {return "";}
        else {return "";}
    }

    getColorClass(s:number){
        if (s>0){return "green";}
        else if (s<0) {return "red";}
        else {return "";}
    }

}