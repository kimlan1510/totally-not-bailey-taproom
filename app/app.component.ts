import { Component } from '@angular/core';
import { Keg } from './keg.model';
@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="jumbotron">
      <h3>{{currentFocus}}</h3>
      <h1>Tap List for {{month}}/{{day}}/{{year}}</h1>
    </div>
    <hr>
    <edit-keg [childSelectedKeg] = "masterSelectedKeg" (finishedEditingSender)="finishedEditing()"></edit-keg>
    <div class="row">
      <div class="col-sm-2">
        <new-keg (newKegSender)="addNewKeg($event)"></new-keg>
      </div>
      <div class="col-sm-8">
      </div>
      <div class="col-sm-2">
        <div id="happyHour">
        <button type="button" (click)="setHappyHour()">Happy Hour Pricing</button>
        </div>
      </div>
    </div>
    <keg-list [childKegList] = "masterKegList" (clickSender)="editKeg($event)"></keg-list>
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
    new Keg('PBR', 'Blue Ribbon', 4.7, 2, 'Lager'),
    new Keg('Sour Zombie', 'Catawba', 6.3, 5, 'Sour'),
    new Keg('Tsing Tao', 'Tsingtao', 4.8, 3, 'Pilsner'),
    new Keg('Urban Farmhouse Saison', 'Commons', 5.3, 5, 'Saison'),
    new Keg('Gandaland Returns', 'Widmer', 6, 5, 'Belgian'),
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
