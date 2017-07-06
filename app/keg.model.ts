
export class Keg {
  public fullness: number = 1984;
  public happyHour: boolean = false;
  public info: string;
  constructor(public name: string, public branch: string, public alcoholContent: number, public price: number, public style: string) { }
}
