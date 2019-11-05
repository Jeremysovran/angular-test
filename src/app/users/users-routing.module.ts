import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  { path: 'create', component: NewUserComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
