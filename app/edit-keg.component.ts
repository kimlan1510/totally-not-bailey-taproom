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
      <label>Enter Keg Name:</label>
      <input [(ngModel)]="childSelectedKeg.name">
      <label>Enter Branch</label>
      <input [(ngModel)]="childSelectedKeg.branch">
      <label>Enter Alcohol Content</label>
      <input [(ngModel)]="childSelectedKeg.alcoholContent">
      <label>Enter Price</label>
      <input [(ngModel)]="childSelectedKeg.price">
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
