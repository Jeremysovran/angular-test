import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppareilViewComponent } from '../appareils/components/appareil-view/appareil-view.component';
import { AppareilComponent } from '../appareils/components/appareil/appareil.component';
import { EditAppareilComponent } from '../appareils/components/edit-appareil/edit-appareil.component';
import { SingleAppareilComponent } from '../appareils/components/single-appareil/single-appareil.component';
import { AppareilsRoutingModule } from './appareils-routing.module';
import { AppareilService } from './services/appareil.service';


@NgModule({
  declarations: [
    AppareilComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    EditAppareilComponent
  ],
  imports: [
    CommonModule,
    AppareilsRoutingModule,
    FormsModule
  ],
  providers: [
    AppareilService,
  ],
})
export class AppareilsModule { }
