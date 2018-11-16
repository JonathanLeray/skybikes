import {Component, OnInit} from '@angular/core';
import {Station} from "../../models/Station.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StationsService} from "../../services/stations.service";

@Component({
  selector: 'app-single-station',
  templateUrl: './single-station.component.html',
  styleUrls: ['./single-station.component.scss']
})
export class SingleStationComponent implements OnInit {

  station: Station;

  constructor(private route: ActivatedRoute,
              private stationsService: StationsService,
              private router: Router) { }

  ngOnInit() {
    this.station =  new Station('', 0, 0);
    const id = this.route.snapshot.params['id'];
    this.stationsService.getSingleStation(+id).then(
      (station: Station) => {
        this.station = station;console.log('station',station);
      }
    )
  }

  onBack() {
    this.router.navigate(['/stations'])
  }

}
