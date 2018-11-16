import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Bike} from '../models/Bike.model';
import {User} from '../models/User.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  bikes: Bike[] = [];
  bikeSubject = new Subject<Bike[]>();

  constructor() { }

  emitBikes() {
    this.bikeSubject.next(this.bikes);
  }

  saveBikes() {
    firebase.database().ref('/bikes').set(this.bikes);
  }

  getBikes() {
    firebase.database().ref('/bikes')
      .on('value', (data) => {
        this.bikes = data.val() ? data.val() : [];
        this.emitBikes();
      });
  }

  getSingleBike(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/bikes/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBike(newBike: Bike) {
    this.bikes.push(newBike);
    this.saveBikes();
    this.emitBikes();
  }

  removeBike(bike: Bike) {
    const bikeIndexToRemove = this.bikes.findIndex(
      (bikeEl) => {
        if (bikeEl === bike) {
          return true;
        }
      }
    );
    this.bikes.splice(bikeIndexToRemove, 1);
    this.saveBikes();
    this.emitBikes();
  }

  getRentByUserId(userId: string) {
    var rent = false;
    for (const bike of this.bikes) {
      if (bike.renterId === userId) {
        rent = true;
      }
    }
    return rent;
  }

  rentBike(bike: Bike, renter: User) {
    const bikeIndexToRent = this.bikes.findIndex(
      (bikeEl) => {
        if (bikeEl === bike) {
          return true;
        }
      }
    );
    this.bikes[bikeIndexToRent].renterId = renter.id;
    this.bikes[bikeIndexToRent].renterDate = new Date().getTime();
    this.saveBikes();
    this.emitBikes();
  }

  returnBike(bike: Bike) {
    const bikeIndexToRent = this.bikes.findIndex(
      (bikeEl) => {
        if (bikeEl === bike) {
          return true;
        }
      }
    );
    delete this.bikes[bikeIndexToRent].renterId;
    delete this.bikes[bikeIndexToRent].renterDate;
    this.saveBikes();
    this.emitBikes();
  }
}
