export class Station {
  id: string;
  slots: string[] = [];
  constructor(public name: string, public lat: number, public long: number) {
    this.id =  Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  }
}
