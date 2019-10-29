import { User } from '../models/User.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import uuidv1 from 'uuid/v1';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    // {
    //   firstName: 'James',
    //   lastName: 'Smith',
    //   email: 'james@simth.com',
    //   drinkPreference: 'coca',
    //   hobbies:[
    //     'coder',
    //     'la bière',
    //     'le saucisson'
    //   ]
    // }
  ];

  constructor() {}

  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users);
  }
  addUser(user: User) {
    // console.log(user);
    this.users.push(user);
    this.saveUserToServer();
    this.emitUsers();
  }
  saveUserToServer() {

    console.log(this.users);
    firebase.database().ref('/user').set(this.users , () => {
      console.log('enregistrement user terminé');
      // this.getUserFromServer();
    });

    // old version without authentification
    // this.httpClient
    // .put('https://test-projet-angular.firebaseio.com/user.json', this.users)
    // .subscribe(
    //   () => {
    //     console.log('enregistrement user terminé');
    //     this.getUserFromServer();
    //   },
    //   (error) => {
    //     console.log('error - ', error);
    //   }
    // );
  }


  getUserFromServer() {
    firebase.database().ref('/user').on('value' , (data) => {
      console.log('get user');
      this.users = data.val() ? data.val() : [];
      this.emitUsers();
    });


    // old version without authentification
    // this.httpClient
    // .get<[any]>('https://test-projet-angular.firebaseio.com/user.json')
    // .subscribe(
    //   (response) => {
    //     this.users = response;
    //     this.emitUsers();
    //   },
    //   (error) => {
    //     console.log('error get - ', error);
    //   }
    // );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const upload = firebase.storage().ref()
        .child('images/' + uuidv1() + file.name)
        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement..');
          },
          (error) => {
            console.log('erreur chargement', error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL);
              console.log('File available at', downloadURL);
              this.emitUsers();
            });
          }
        );
      }
    );
  }
}
