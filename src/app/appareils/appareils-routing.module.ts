import { SingleAppareilComponent } from './components/single-appareil/single-appareil.component';
import { EditAppareilComponent } from './components/edit-appareil/edit-appareil.component';
import { AppareilViewComponent } from './components/appareil-view/appareil-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppareilViewComponent,
  },
  { path: 'edit', component: EditAppareilComponent },
  {
    path: ':id',
    component: SingleAppareilComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppareilsRoutingModule {}
