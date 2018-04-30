import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMealIngredientPage } from './add-meal-ingredient';

@NgModule({
  declarations: [
    AddMealIngredientPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMealIngredientPage),
  ],
})
export class AddMealIngredientPageModule {}
