import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from "../models/User.model";
import {Subscription} from "rxjs";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[];
  userSubscription: Subscription

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.getUsers();
    this.userService.emitUsers();
  }

  onNewUser() {
    this.router.navigate(['/users', 'new']);
  }

  onDeleteUser(user: User) {
    this.userService.removeUser(user)
  }

  onViewUser(id: Number) {
    this.router.navigate(['/users', 'view', id]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
