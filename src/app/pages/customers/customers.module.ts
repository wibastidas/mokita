import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomersPageRoutingModule } from './customers-routing.module';
import { CustomersPage } from './customers.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomersPageRoutingModule,
    TextAvatarModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CustomersPage]
})
export class CustomersPageModule {}
