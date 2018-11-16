import {Component, OnInit, OnDestroy} from '@angular/core';
import {Bike} from '../models/Bike.model';
import {Subscription} from 'rxjs';
import {BikesService} from '../services/bikes.service';
import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss']
})
export class BikeListComponent implements OnInit, OnDestroy {

  bikes: Bike[];
  bikeSubscription: Subscription;

  constructor(private bikeService: BikesService,
              private authService: AuthService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.bikeSubscription = this.bikeService.bikeSubject.subscribe(
      (bikes: Bike[]) => {
        this.bikes = bikes;
      }
    );
    this.bikeService.getBikes();
    this.bikeService.emitBikes();
  }

  dateDiff(date1, date2) {
    const diff = {hour: 0, min: 0};
    let tmp = Math.abs(date2 - date1);
    diff.hour = Math.round(tmp / 1000 / 2);
    diff.min = Math.trunc(tmp / 1000 % 2) > 0 ? 0 : 30;
    return diff;
  }

  rentTimeRemaining(bike: Bike) {
    return this.dateDiff(new Date().getTime(), bike.renterDate + 8 * 2 * 1000);
  }

  isLateReturn(bike: Bike) {
    var isLate = false;
    if(bike.renterDate){
      isLate = (((bike.renterDate + 8* 2 * 1000) - (new Date().getTime())) < 0);
    }
    return isLate;
  }

  onNewBike() {
    this.router.navigate(['/bikes', 'new']);
  }

  onRentBike(bike: Bike) {
    this.bikeService.rentBike(bike, this.authService.currentUser);
  }

  onReturnBike(bike: Bike) {
    this.bikeService.returnBike(bike);
  }

  onDeleteBike(bike: Bike) {
    this.bikeService.removeBike(bike);
  }

  onViewBike(id: Number) {
    this.router.navigate(['/bikes', 'view', id]);
  }

  ngOnDestroy() {
    this.bikeSubscription.unsubscribe();
  }

}
