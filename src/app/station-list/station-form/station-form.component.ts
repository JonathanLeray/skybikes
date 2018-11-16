import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StationsService} from '../../services/stations.service';
import {Router} from '@angular/router';
import {Station} from '../../models/Station.model';

@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.scss']
})
export class StationFormComponent implements OnInit {

  stationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private stationsService: StationsService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.stationForm = this.formBuilder.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
    });
  }

  onSaveStation() {
    const name = this.stationForm.get('name').value;
    const lat = this.stationForm.get('lat').value;
    const long = this.stationForm.get('long').value;
    const newStation = new Station(name, lat, long);
    this.stationsService.createNewStation(newStation);
    this.router.navigate(['/stations']);
  }
}
