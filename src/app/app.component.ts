import {Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: "AIzaSyDhnTt6NZyjgtmE3ycaD8yUvU0CVTOC5dY",
      authDomain: "sky-bikes.firebaseapp.com",
      databaseURL: "https://sky-bikes.firebaseio.com",
      projectId: "sky-bikes",
      storageBucket: "sky-bikes.appspot.com",
      messagingSenderId: "43902628801"
    };
    firebase.initializeApp(config);
  }
}
