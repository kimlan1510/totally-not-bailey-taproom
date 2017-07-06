import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'new-keg',
  template: `
  <button (click)="addKegForm()">Add a new Keg</button>
  <div *ngIf="addKeg">
  <h1>Add New Keg</h1>
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
      <label>Enter Style</label>
      <select #newKegStyle>
        <option> IPA </option>
        <option> Lager </option>
        <option> Ale </option>
        <option> Belgian </option>
        <option> Sour </option>
        <option> Saison </option>
        <option> Pilsner </option>
      </select>
      <button type="button" (click)="submitForm(newKegName.value, newKegBranch.value, newKegAlContent.value, newKegPrice.value, newKegStyle.value)">Add Keg</button>
    </form>
  </div>
  `
})

export class AddKegComponent {
  // @Input() childKegAdded: boolean;
  @Output() newKegSender = new EventEmitter();
  addKeg: boolean = false;
  submitForm(name: string, branch: string, alcoholContent: number, price: number, style: string){
    var newKegToAdd: Keg = new Keg(name, branch, alcoholContent, price, style);
    this.newKegSender.emit(newKegToAdd);
    this.addKeg = false;
  }

  addKegForm(){
    this.addKeg = true;
  }
}
