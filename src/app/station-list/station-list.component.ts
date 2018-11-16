import {Component, OnInit, OnDestroy} from '@angular/core';
import {Station} from "../models/Station.model";
import {Subscription} from "rxjs";
import {StationsService} from "../services/stations.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit, OnDestroy {

  stations: Station[];
  stationSubscription: Subscription

  constructor(private stationService: StationsService, private router: Router) { }

  ngOnInit() {
    this.stationSubscription = this.stationService.stationSubject.subscribe(
      (stations: Station[]) => {
        this.stations = stations;
      }
    );
    this.stationService.getStations();
    this.stationService.emitStations();
  }

  onNewStation() {
    this.router.navigate(['/stations', 'new']);
  }

  onDeleteStation(station: Station) {
    this.stationService.removeStation(station)
  }

  onViewStation(id: Number) {
    this.router.navigate(['/stations', 'view', id]);
  }

  ngOnDestroy() {
    this.stationSubscription.unsubscribe();
  }

}
