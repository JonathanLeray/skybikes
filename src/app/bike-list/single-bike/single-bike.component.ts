import {Component, OnInit} from '@angular/core';
import {Bike} from '../../models/Bike.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BikesService} from '../../services/bikes.service';

@Component({
  selector: 'app-single-bike',
  templateUrl: './single-bike.component.html',
  styleUrls: ['./single-bike.component.scss']
})
export class SingleBikeComponent implements OnInit {

  bike: Bike;

  constructor(private route: ActivatedRoute,
              private bikesService: BikesService,
              private router: Router) { }

  ngOnInit() {
    this.bike =  new Bike('', '');
    const id = this.route.snapshot.params['id'];
    this.bikesService.getSingleBike(+id).then(
      (bike: Bike) => {
        this.bike = bike;
      }
    )
  }

  onBack() {
    this.router.navigate(['/bikes'])
  }

}
