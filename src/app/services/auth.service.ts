import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {User} from '../models/User.model';
import {UsersService} from './users.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: Boolean;
  isAuthSubject = new Subject<Boolean>();
  currentUser: User;
  currentUserSubject = new Subject<User>();

  constructor(private usersService: UsersService) {
    this.isAuth = false;
    this.currentUser = new User('', '', '', '', '');
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.getCurrentUser();
        }
      }
    );
  }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            this.usersService.getSingleUserByEmail(firebase.auth().currentUser.email).then(
              (user: User) => {
                this.isAuth = true;
                this.currentUser = user;
                this.emitCurrentUser();
                resolve();
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (a) => {
            this.usersService.getSingleUserByEmail(firebase.auth().currentUser.email).then(
              (user: User) => {
                this.isAuth = true;
                this.currentUser = user;
                this.emitCurrentUser();
                resolve();
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
    this.isAuth = false;
    this.currentUser = new User('', '', '', '', '');
    this.emitCurrentUser();
  }

  emitCurrentUser() {
    this.currentUserSubject.next(this.currentUser);
    this.isAuthSubject.next(this.isAuth);
  }

  getCurrentUser() {
    return this.usersService.getSingleUserByEmail(firebase.auth().currentUser.email).then(
      (user: User) => {
        this.isAuth = true;
        this.currentUser = user;
        this.emitCurrentUser();
        return(user);
      }
    );
  }
}
