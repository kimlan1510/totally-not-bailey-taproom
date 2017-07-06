import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {AppComponent}   from './app.component';
import {FormsModule}    from '@angular/forms';
import {EditKegComponent} from './edit-keg.component';
import {KegListComponent} from './keg-list.component';
import {AddKegComponent} from './add-keg.component';
import { StylePipe } from './style.pipe';

@NgModule({
  imports: [ BrowserModule, FormsModule],
  declarations: [ AppComponent,
                  EditKegComponent,
                  AddKegComponent,
                  KegListComponent,
                  StylePipe],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
