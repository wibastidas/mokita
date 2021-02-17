import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxGaugeModule } from 'ngx-gauge';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatsPageRoutingModule } from './stats-routing.module';
import { StatsPage } from './stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    SharedModule,
    NgxGaugeModule
  ],
  declarations: [StatsPage]
})
export class StatsPageModule {}
