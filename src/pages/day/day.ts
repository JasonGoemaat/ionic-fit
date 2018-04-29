import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { IngredientSelectionService } from '../../services/ingredient-selection.service';

/**
 * Generated class for the DayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-day',
  templateUrl: 'day.html',
})
export class DayPage {
  /** days from 1/1/1970, used for displaying date */
  current: number;

  /** days from 1/1/1970 for current date, used for displaying 'yesterday' or 'today' */
  today: number;

  ingredients = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public ingredientSelectionService: IngredientSelectionService) {
    // DEV: for testing in the browser
    window['moment'] = moment;
    window['CDAY'] = this;
    
    // calculate today as an integer number of days since 1/1/1970
    let now = new Date().getTime();
    let adjusted = now - (4 * 3600 * 1000); // 4 hours early, so until 4 am will be working on yesterday
    adjusted = Math.trunc(adjusted / (24 * 1000 * 60 * 60)); // to days
    this.today = adjusted;

    // if 'day' parameter is passed, use it, otherwise use today
    let paramDay = navParams.get('day');
    if (paramDay) {
      this.current = paramDay;
    } else {
      this.current = this.today;
    }
    this.current = adjusted;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayPage');
  }

  get title(): string {
    // format is like 'Saturday 4/28'
    // if today, add ' (today)', if yesterday add ' (yesterday)'
    
    // 
    let d = new Date(new Date('1/1/1970').getTime() + this.current * 24 * 3600 * 1000);
    let dateString = moment(d).format('dddd M/D');
    if (this.current == this.today) {
      dateString += ' (today)';
    } else if (this.current == (this.today - 1)) {
      dateString += ' (yesterday)';
    }

    return dateString;
  }

  addIngredient() {
    this.ingredientSelectionService.selectIngredient()
    .subscribe(ingredient => {
      console.log('You selected:', ingredient);
      this.ingredients.unshift(ingredient);
    });
  }

  editIngredient(ingredient) {
    this.ingredientSelectionService.selectIngredient(ingredient);
  }

  deleteIngredient(ingredient) {
    this.ingredients = this.ingredients.filter(x => x != ingredient);
  }
}
