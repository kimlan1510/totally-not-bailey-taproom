import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Tap List for {{month}}/{{day}}/{{year}}/</h1>
    <h3>{{currentFocus}}</h3>
    <ul>
      <li *ngFor="let currentKeg of kegs">{{currentKeg.name}}, {{currentKeg.branch}},
      <span [class]="isFull(currentKeg)">{{currentKeg.fullness}} oz</span>,
      <span [class]="costColor(currentKeg)">$ {{currentKeg.price}}</span>,
      <span [class]="alcoholColor(currentKeg)">{{currentKeg.alcoholContent}}%</span>
      <button (click)="editKeg(currentKeg)">Edit!</button>
      <button (click)="refillKeg(currentKeg)">Refill!</button>
      <button (click)="checkIfFull(16, currentKeg)">Have a drink! 16oz</button>
      <button (click)="checkIfFull(8, currentKeg)">Have a drink! 8oz</button> <br />Take some home:
      <button (click)="checkIfFull(64, currentKeg)">Full Growler</button>
      <button (click)="checkIfFull(32, currentKeg)">Half Growler</button>
      </li>
    </ul>
    <hr>
    <div *ngIf="selectedKeg">
      <h3>{{selectedKeg.name}}</h3>
      <h3>{{selectedKeg.branch}}</h3>
      <h3>{{selectedKeg.alcoholContent}}</h3>
      <h3>{{selectedKeg.price}}</h3>
      <p>
        Is it full? {{selectedKeg.fullness}}
      </p>
      <h3>Edit Keg</h3>
      <label>Enter Keg Name:</label>
      <input [(ngModel)]="selectedKeg.name">
      <label>Enter Branch</label>
      <input [(ngModel)]="selectedKeg.branch">
      <label>Enter Alcohol Content</label>
      <input [(ngModel)]="selectedKeg.alcoholContent">
      <label>Enter Price</label>
      <input [(ngModel)]="selectedKeg.price">
      <button (click)="finishedEditing()">Done</button>
      <hr>
    </div>
    <div>
      <button type="button" (click)="setHappyHour()">Happy Hour Pricing</button>
    </div>
    <button (click)="addKegForm()">Add a new Keg</button>
    <div *ngIf="addKeg">
      <form>
        <h3> Add a new Keg</h3>
        <label>Enter Keg Name:</label>
        <input #newKegName>
        <label>Enter Branch</label>
        <input #newKegBranch>
        <label>Enter Alcohol Content</label>
        <input #newKegAlContent>
        <label>Enter Price</label>
        <input #newKegPrice>
        <button type="button" (click)="addNewKeg(newKegName.value, newKegBranch.value, newKegAlContent.value, newKegPrice.value)">Add Keg</button>
      </form>
    </div>

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
  kegs: Keg[] = [
    new Keg('Red Saigon', 'SABECO', 4.5, 2),
    new Keg('The Incredible IIPA', 'Block 15', 11.5, 6),
    new Keg('Double Trouble', 'Founders', 9.6, 5),
    new Keg('Los Locos', 'Epic', 4.7, 5),
    new Keg('Lil Sumpin', 'Lagunitas', 8.6, 5)
  ];
  addKeg: boolean = false;
  selectedKeg: Keg = null;


  addNewKeg(kegName: string, kegBranch: string, kegAlcoholContent: number, kegPrice: number){
    this.kegs.push(new Keg(kegName, kegBranch, kegAlcoholContent, kegPrice));
    this.addKeg = false;
  }


  setHappyHour(){
    for(let keg of this.kegs) {
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

  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
  }

  finishedEditing(){
    this.selectedKeg = null;
  }

  addKegForm(){
    this.addKeg = true;
  }

  refillKeg(clickedKeg){
    if(clickedKeg.fullness === 1984){
      console.log("This keg is still full.");
    }
    else{
      clickedKeg.fullness = 1984;
    }
  }

  checkIfFull(serving, selectedKeg){
    if(selectedKeg.fullness === 0){
      console.log("This keg is empty!")
    }
    else if((selectedKeg.fullness - serving) < 0){
      console.log("Order a smaller size");
    }
    else{
      if(serving === 16){
        this.orderKeg16oz(selectedKeg)
      }
      else if(serving === 8){
        this.orderKeg8oz(selectedKeg)
      }
      else if(serving === 64){
        this.orderKeg64oz(selectedKeg)
      }
      else{
        this.orderKeg32oz(selectedKeg)
      }
    }
  }

  orderKeg16oz(clickedKeg){
    // this.selectedKeg = clickedKeg;
    return clickedKeg.fullness -= 16;
  }

  orderKeg8oz(clickedKeg){
    // this.selectedKeg = clickedKeg;
    return clickedKeg.fullness -= 8;
  }
  orderKeg64oz(clickedKeg){
    // this.selectedKeg = clickedKeg;
    return clickedKeg.fullness -= 64;
  }
  orderKeg32oz(clickedKeg){
    // this.selectedKeg = clickedKeg;
    return clickedKeg.fullness -= 32;
  }

  isFull(clickedKeg: Keg) {
    if(clickedKeg.fullness >= 1485) {
      return "full";
    }
    else if(clickedKeg.fullness <= 160){
      return "almostEmpty";
    }
    else {
      return "doinGUD";
    }
  }

  alcoholColor(currentKeg) {
    if (currentKeg.alcoholContent > 7){
      return "textRed";
    } else if (currentKeg.alcoholContent <= 4) {
      return "textGreen";
    } else {
      return "textYellow";
    }
  }

  costColor(clickedKeg){
    if(clickedKeg.price >= 8){
      return "overprice";
    }
    else if(clickedKeg.price <= 4){
      return "underprice";
    }
    else{
      return "soso";
    }
  }

}

export class Keg {
  public fullness: number = 1984;
  public happyHour: boolean = false;
  constructor(public name: string, public branch: string, public alcoholContent: number, public price: number) { }
}
