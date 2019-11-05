import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../users/shared/user.service';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  providers: [
    UserService
  ],
})
export class UsersModule { }
