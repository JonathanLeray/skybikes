export class Bike {
  id: string;
  photo: string;
  renterId: string;
  renterDate: number;
  constructor(public color: string, public comment: string) {
    this.id =  Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  }
}
