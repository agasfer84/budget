import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { HttpModule }   from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
//import {MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule, MdProgressBarModule, MdIconModule, MdIconRegistry, MdMenuModule, MdToolbarModule,} from '@angular/material';

import 'hammerjs';

//компоненты
import { AppComponent } from './components/app.component';
import { DebetComponent } from './components/debet.component';
import { CreditComponent } from './components/credit.component';
import { StatComponent } from './components/stat.component';
import { TopComponent } from './components/top.component';


// определение маршрутов
const appRoutes: Routes =[

  { path: '', redirectTo: 'credit', pathMatch: 'full'},
  { path: 'debet', component: DebetComponent},
  { path: 'credit', component: CreditComponent},
  { path: 'stat', component: StatComponent},
  { path: 'top', component: TopComponent},
  { path: '**', redirectTo: 'credit', pathMatch: 'full' }

];


@NgModule({
  declarations: [
    AppComponent, DebetComponent, CreditComponent, StatComponent, TopComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes), BrowserAnimationsModule, MaterialModule, Ng2GoogleChartsModule
    //MdCardModule, MdButtonModule, MdIconModule, MdProgressBarModule, MdInputModule, MdMenuModule, MdToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
