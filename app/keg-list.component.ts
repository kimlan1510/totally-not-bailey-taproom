import {Component, Input, Output, EventEmitter } from '@angular/core';
import {Keg} from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <select (change)="onChange($event.target.value)">
    <option value="All">All Beers</option>
    <option value="Lager">Lager</option>
    <option value="IPA">IPA</option>
    <option value="Ale">Ale</option>
    <option value="Belgian">Belgian</option>
    <option value="Sour">Sour</option>
    <option value="Saison">Saison</option>
    <option value="Pilsner">Pilsner</option>
  </select>
  <div class="row">
    <div class="beerList">
      <ul class="columnList">
        <li *ngFor="let currentKeg of childKegList | style: filterByStyle">{{currentKeg.name}}, {{currentKeg.branch}}, {{currentKeg.style}}
        <span [class]="isFull(currentKeg)">{{currentKeg.fullness}} oz</span>,
        <span [class]="costColor(currentKeg)">$ {{currentKeg.price}}</span>,
        <span [class]="alcoholColor(currentKeg)">{{currentKeg.alcoholContent}}%</span>

        <button (click)="editKegIsClicked(currentKeg)">Edit!</button>

        <button (click)="refillKeg(currentKeg)">Refill!</button>
        <button (click)="checkIfFull(16, currentKeg)">Have a drink! 16oz</button>
        <button (click)="checkIfFull(8, currentKeg)">Have a drink! 8oz</button> <br />Take some home:
        <button (click)="checkIfFull(64, currentKeg)">Full Growler</button>
        <button (click)="checkIfFull(32, currentKeg)">Half Growler</button>
        </li>
      </ul>
    </div>
  </div>
  `
})

export class KegListComponent {
  @Input() childKegList: Keg[];
  @Output() clickSender = new EventEmitter();

  filterByStyle: string = "All";

  onChange(optionFromMenu) {
    this.filterByStyle = optionFromMenu;
  }

  editKegIsClicked(kegToEdit: Keg){
    this.clickSender.emit(kegToEdit);
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
