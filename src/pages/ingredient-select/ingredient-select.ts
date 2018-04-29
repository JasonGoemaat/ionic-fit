import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IngredientSelectionService } from '../../services/ingredient-selection.service';

/**
 * Generated class for the IngredientSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingredient-select',
  templateUrl: 'ingredient-select.html',
})
export class IngredientSelectPage {
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ingredientSelectionService: IngredientSelectionService) {
    window['PIS'] = this;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientSelectPage');
  }

  submit() {
    this.ingredientSelectionService.completeIngredient({
      name: this.name
    });
  }
}
