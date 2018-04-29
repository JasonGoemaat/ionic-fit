import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngredientSelectPage } from './ingredient-select';

@NgModule({
  declarations: [
    IngredientSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(IngredientSelectPage),
  ],
})
export class IngredientSelectPageModule {}
