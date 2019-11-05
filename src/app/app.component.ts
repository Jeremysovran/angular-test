import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubscription: Subscription;
  isAuth: boolean;

  constructor(private authService: AuthService) {

    // Initialize Firebase
    firebase.initializeApp(environment);
  }

  ngOnInit() {
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.secondes = value;
      }
    );
    firebase.auth().onAuthStateChanged(
      (user) => {
       if (user) {
         this.isAuth = true;
       } else {
         this.isAuth = false;
       }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
