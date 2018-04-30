import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Meal } from '../../models';
import { IngredientSelectionService } from '../../services/ingredient-selection.service';

/**
 * Generated class for the AddMealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-meal',
  templateUrl: 'add-meal.html',
})
export class AddMealPage {
  meal: Meal;
  editing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ingredientSelectionService: IngredientSelectionService
  ) {
    window['CADDMEAL'] = this;
    console.log('AddMeal navParams:', navParams);
    this.meal = navParams.get('meal');
    if (this.meal == null) {
      this.meal = new Meal();
      this.editing = false;
    } else {
      this.editing = true;
    }
  }

  get title(): string {
    return this.editing ? "Edit Meal" : "Add Meal";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMealPage');
  }


  addIngredient() {
    this.ingredientSelectionService.selectIngredient()
      .subscribe(ingredient => {
        console.log('You selected:', ingredient);
        this.meal.ingredients.push(ingredient);
      });
  }
}
