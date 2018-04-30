import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestNutritionPage } from './test-nutrition';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TestNutritionPage,
  ],
  imports: [
    IonicPageModule.forChild(TestNutritionPage),
    ComponentsModule
  ],
})
export class TestNutritionPageModule {}
