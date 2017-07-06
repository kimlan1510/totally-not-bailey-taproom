import { Component } from '@angular/core';
import { Keg } from './keg.model';
@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Tap List for {{month}}/{{day}}/{{year}}/</h1>
    <h3>{{currentFocus}}</h3>
    <keg-list [childKegList] = "masterKegList" (clickSender)="editKeg($event)"></keg-list>
    <hr>
    <edit-keg [childSelectedKeg] = "masterSelectedKeg" (finishedEditingSender)="finishedEditing()"></edit-keg>

    <div>
      <button type="button" (click)="setHappyHour()">Happy Hour Pricing</button>
    </div>

    <new-keg (newKegSender)="addNewKeg($event)"></new-keg>

  </div>
  `
})

export class AppComponent {
  currentFocus: string = 'Totally Not Baileys Taproom';
  currentTime = new Date();
  month: number = this.currentTime.getMonth() + 1;
  day: number = this.currentTime.getDate();
  year: number = this.currentTime.getFullYear();
  second: number = this.currentTime.getSeconds();
  masterKegList: Keg[] = [
    new Keg('Red Saigon', 'SABECO', 4.5, 2, 'Lager'),
    new Keg('The Incredible IIPA', 'Block 15', 11.5, 6, 'IPA'),
    new Keg('Double Trouble', 'Founders', 9.6, 5, 'IPA'),
    new Keg('Los Locos', 'Epic', 4.7, 5, 'Lager'),
    new Keg('Lil Sumpin', 'Lagunitas', 8.6, 5, 'Ale')
  ];

  masterSelectedKeg: Keg = null;

  setHappyHour(){
    for(let keg of this.masterKegList) {
      if (keg.happyHour === false){
        keg.happyHour = true;
        keg.price = keg.price - 1;
      }
      else {
        keg.happyHour = false;
        keg.price += 1;
      }
    };
  }

  addNewKeg(newKegFromChild: Keg){
    this.masterKegList.push(newKegFromChild);
  }

  editKeg(clickedKeg) {
    this.masterSelectedKeg = clickedKeg;
  }

  finishedEditing(){
    this.masterSelectedKeg = null;
  }



}
