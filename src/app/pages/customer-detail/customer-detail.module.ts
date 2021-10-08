import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { IonMaskDirective } from 'src/app/ion-mask.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerDetailPageRoutingModule } from './customer-detail-routing.module';
import { CustomerDetailPage } from './customer-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDetailPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TextAvatarModule,
  ],
  declarations: [CustomerDetailPage, IonMaskDirective]
})
export class CustomerDetailPageModule {}
