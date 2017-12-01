import {Injectable} from '@angular/core';
import { Messages } from '../includes/messages';


@Injectable()
export class MessagesService {

    messages = new Messages();

    constructor(){}

    messageMe(mess:[string[],string[]]) {

        var self = this;
        this.messages.message=mess[0];
        this.messages.type=mess[1];

        setTimeout(function() {

            self.clearMessages();

        }, 10000);

    }

    clearMessages(){
        this.messages = new Messages();
    }

    closeMessage(mess_index: number) {

        this.messages.message[mess_index]="";
        this.messages.type[mess_index]="";

    }

}
