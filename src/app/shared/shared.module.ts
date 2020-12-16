import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [SkeletonComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    IonicModule
  ],
  exports: [SkeletonComponent]
})
export class SharedModule { }
