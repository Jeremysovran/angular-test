import { UserService } from '../../shared/user.service';
import { User } from '../../models/User.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  userSubcription: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSubcription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.getUserFromServer();
    this.userService.emitUsers();
  }

  ngOnDestroy() {
  this.userSubcription.unsubscribe();
}
}
