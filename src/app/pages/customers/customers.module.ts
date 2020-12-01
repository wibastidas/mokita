import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { CustomersPageRoutingModule } from './customers-routing.module';
import { CustomersPage } from './customers.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomersPageRoutingModule,
    TextAvatarModule
  ],
  declarations: [CustomersPage]
})
export class CustomersPageModule {}
