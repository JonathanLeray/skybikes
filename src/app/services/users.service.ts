import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../models/User.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  userSubject = new Subject<User[]>();

  constructor() {this.getUsers() }

  emitUsers() {
    this.userSubject.next(this.users);
  }

  saveUsers() {
    firebase.database().ref('/users').set(this.users);
  }

  getUsers() {
    firebase.database().ref('/users')
      .on('value', (data) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      });
  }

  getSingleUser(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleUserByKey(keyName: string, keyValue: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/').once('value').then(
          (data) => {
            this.users = data.val() ? data.val() : [];
            let currentUser = null;
            for (const user of this.users) {
              if (user[keyName] === keyValue) {
                currentUser = user;
              }
            }
            resolve(currentUser);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleUserByEmail(email: string) {
    return this.getSingleUserByKey('email', email);
  }

  getSingleUserById(id: string) {
    return this.getSingleUserByKey('id', id);
  }

  getSingleUserByKeyCache(keyName: string, keyValue: string) {
    let currentUser = null;
    for (const user of this.users) {
      if (user[keyName] === keyValue) {
        currentUser = user;
      }
    }
    return(currentUser);
  }

  getSingleUserByEmailCache(email: string) {
    return this.getSingleUserByKeyCache('email', email);
  }

  getSingleUserByIdCache(id: string) {
    return this.getSingleUserByKeyCache('id', id);
  }

  createNewUser(newUser: User) {
    this.users.push(newUser);
    this.saveUsers();
    this.emitUsers();
  }

  removeUser(user: User) {
    if (user.photo) {
      const storageRef = firebase.storage().refFromURL(user.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo deleted');
        },
        (error) => {
          console.log('File not found : ' + error);
        }
      );
    }
    const userIndexToRemove = this.users.findIndex(
      (userEl) => {
        if (userEl === user) {
          return true;
        }
      }
    );
    this.users.splice(userIndexToRemove, 1);
    this.saveUsers();
    this.emitUsers();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Uploading...');
          },
          (error) => {
            console.log('Uploading error : ' + error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadURL) => {
                resolve(downloadURL);
              }
            )
          },
        );
      }
    );
  }
}
