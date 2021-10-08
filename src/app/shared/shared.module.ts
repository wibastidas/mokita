import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonMaskDirective } from '../ion-mask.directive';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [SkeletonComponent, IonMaskDirective],
  imports: [
    CommonModule,
    SharedRoutingModule,
    IonicModule
  ],
  exports: [SkeletonComponent, IonMaskDirective]
})
export class SharedModule { }
