import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Station} from '../models/Station.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  stations: Station[] = [];
  stationSubject = new Subject<Station[]>();

  constructor() { }

  emitStations() {
    this.stationSubject.next(this.stations);
  }

  saveStations() {
    firebase.database().ref('/stations').set(this.stations);
  }

  getStations() {
    firebase.database().ref('/stations')
      .on('value', (data) => {
        this.stations = data.val() ? data.val() : [];
        this.emitStations();
      });
  }

  getSingleStation(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/stations/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewStation(newStation: Station) {
    this.stations.push(newStation);
    this.saveStations();
    this.emitStations();
  }

  removeStation(station: Station) {
    const stationIndexToRemove = this.stations.findIndex(
      (stationEl) => {
        if (stationEl === station) {
          return true;
        }
      }
    );
    this.stations.splice(stationIndexToRemove, 1);
    this.saveStations();
    this.emitStations();
  }
}
