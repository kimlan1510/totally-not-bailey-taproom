import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'edit-keg',
  template: `
    <div *ngIf="childSelectedKeg">
      <h3>{{childSelectedKeg.name}}</h3>
      <h3>{{childSelectedKeg.branch}}</h3>
      <h3>{{childSelectedKeg.alcoholContent}}</h3>
      <h3>{{childSelectedKeg.price}}</h3>
      <p>
        Is it full? {{childSelectedKeg.fullness}}
      </p>
      <h3>Edit Keg</h3>
      <label>Change Keg Name:</label>
      <input [(ngModel)]="childSelectedKeg.name">
      <label>Change Branch</label>
      <input [(ngModel)]="childSelectedKeg.branch">
      <label>Change Alcohol Content</label>
      <input [(ngModel)]="childSelectedKeg.alcoholContent">
      <label>Change Price</label>
      <input [(ngModel)]="childSelectedKeg.price">
      <select [(ngModel)]="childSelectedKeg.style">
        <option> IPA </option>
        <option> Lager </option>
        <option> Ale </option>
        <option> Belgian </option>
        <option> Sour </option>
        <option> Saison </option>
      </select>
      <button (click)="buttonFinishedEditing()">Done</button>
      <hr>
    </div>
  `
})

export class EditKegComponent {
  @Input() childSelectedKeg: Keg;
  @Output() finishedEditingSender = new EventEmitter();

  buttonFinishedEditing(){
    this.finishedEditingSender.emit();
  }
}
