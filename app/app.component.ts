import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Tap List for {{month}}/{{day}}/{{year}}</h1>
    <h3>{{currentFocus}}</h3>
    <ul>
      <li *ngFor="let currentKeg of kegs">{{currentKeg.name}},
      <span [class]="isFull(currentKeg)">{{currentKeg.fullness}} oz</span>,
      <span [class]="costColor(currentKeg)">$ {{currentKeg.price}}</span>,
      <span [class]="alcoholColor(currentKeg)">{{currentKeg.alcoholContent}}%</span>
      <button (click)="editKeg(currentKeg)">Edit!</button>
      <button (click)="checkIfFull(decrementKeg16oz(currentKeg))">Have a drink! 16oz</button>
      <button (click)="checkIfFull(decrementKeg8oz(currentKeg))">Have a drink! 8oz</button> <br />Take some home: <button (click)="checkIfFull(order64ozGrowler(currentKeg))">Full Growler</button> <button (click)="order32ozGrowler(currentKeg)">Half Growler</button>
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
        <button (click)="addNewKeg(newKegName.value, newKegBranch.value, newKegAlContent.value, newKegPrice.value)">Add Keg</button>
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
  kegs: Keg[] = [
    new Keg('Red Saigon', 'SABECO', 4.5, 2)
  ];
  addKeg: boolean = false;
  selectedKeg: Keg = null;


  addNewKeg(kegName: string, kegBranch: string, kegAlcoholContent: number, kegPrice: number){

    this.kegs.push(new Keg(kegName, kegBranch, kegAlcoholContent, kegPrice));
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

  checkIfFull(serveFunction){
    if(serveFunction <= 0){
      alert("Keg is empty");
    }
    // else{
    //   if(ozRemoved === 16){
    //     decrementKeg16oz()
    //   }
    // }
  }

  decrementKeg16oz(clickedKeg){
    // this.selectedKeg = clickedKeg;
    return clickedKeg.fullness -= 16;
  }

  decrementKeg8oz(clickedKeg){
    // this.selectedKeg = clickedKeg;
    return clickedKeg.fullness -= 8;
  }
  order64ozGrowler(clickedKeg){
    // this.selectedKeg = clickedKeg;
    return clickedKeg.fullness -= 64;
  }
  order32ozGrowler(clickedKeg){
    // this.selectedKeg = clickedKeg;
    return clickedKeg.fullness -= 32;
  }

  isFull(clickedKeg: Keg) {
    if(clickedKeg.fullness >= 1485) {
      return "full";
    }
    else if(clickedKeg.fullness <= 1300){
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
  constructor(public name: string, public branch: string, public alcoholContent: number, public price: number) { }
}
