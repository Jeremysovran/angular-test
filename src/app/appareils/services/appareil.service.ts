import { Subject } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AppareilService {

  private appareils = [
    // {
    //   id: 1,
    //   name:'machine à laver',
    //   status:'éteint'
    // },
    // {
    //   id: 2,
    //   name:'télévision',
    //   status:'allumé'
    // },
    // {
    //   id: 3,
    //   name:'ordinateur',
    //   status:'éteint'
    // }
  ];
  
  appareilSubject = new Subject<any[]>();


  constructor(
    // old way => private httpClient: HttpClient
    ) {}

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }
  switchOnAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }
  switchOffAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }
  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }
  switchOffOne(index: number) {
    this.appareils[index].status =  'éteint';
    this.emitAppareilSubject();
  }
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
  saveAppareilToServer() {

    firebase.database().ref('/appareil').set(this.appareils , () => {
      console.log('enregistrement appareil terminé');
      this.getAppareilFromServer();
    });

    // old version without authentification
    // this.httpClient
    // .put('https://test-projet-angular.firebaseio.com/appareil.json', this.appareils)
    // .subscribe(
    //   () => {
    //     console.log('enregistrement terminé');
    //     this.getAppareilFromServer();
    //   },
    //   (error) => {
    //     console.log('error - ', error);
    //   }
    // );
  }
  getAppareilFromServer() {
    firebase.database().ref('/appareil').on('value' , (data) => {
      console.log('get data');
      this.appareils = data.val() ? data.val() : [];
      this.emitAppareilSubject();
    });

    // old version without authentification
    // this.httpClient
    // .get<[any]>('https://test-projet-angular.firebaseio.com/appareil.json')
    // .subscribe(
    //   (response) => {
    //     this.appareils = response;
    //     this.emitAppareilSubject();
    //   },
    //   (error) => {
    //     console.log('error get - ', error);
    //   }
    // );
  }
}