import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { FitItemType, Meal, Exercise, FitItem } from '../../models';
import { AddMealService } from '../../services/add-meal.service';
import { GuidService } from '../../services/guid.service';
import { IngredientSelectionService } from '../../services/ingredient-selection.service';

// export enum FitItemType {
//   meal = 'Meal',
//   exercise = 'Exercise'
// }

console.log('FitItemType:', FitItemType);

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
  /** Make available in template */
  types = {
    meal: FitItemType.meal,
    exercise: FitItemType.exercise
  }

  /** days from 1/1/1970, used for displaying date */
  current: number;

  /** days from 1/1/1970 for current date, used for displaying 'yesterday' or 'today' */
  today: number;

  day = {
    items: <Array<FitItem>> [
      new Meal({
        name: "Whey Shake",
        type: FitItemType.meal,
        hour: 8,
        minute: 30
      }),
      new Exercise({
        hour: 7,
        minute: 0,
        name: "Slim-In-6 Start It up",
        type: FitItemType.exercise,
        complete: true
      })
    ]
  }

  ingredients = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ingredientSelectionService: IngredientSelectionService,
    public guidService: GuidService,
    public addMealService: AddMealService,
  ) {
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

  /**
   * Display time and name of item as part of one string, if time is set
   * @param item item to display string for
   */
  getItemDisplay(item) {
    let name = (item == null || item.name.length <= 0) ? 'UNKNOWN' : item.name;
    let start = "";
    if (typeof (item.hour) === 'number' && typeof (item.minute) === 'number') {
      start = `${item.hour}:${item.minute.toString().padStart(2, '0')} `
    }
    return start + name;
  }

  /**
   * Switch views to the AddMealPage and add the selected meal to today's items
   */
  addMeal() {
    this.addMealService.selectMeal()
    .subscribe(meal => {
      this.day.items.push(meal);
    })
  }

  editItem(item: FitItem) {
    if (item.type === FitItemType.meal) {
      this.addMealService.selectMeal(<Meal>item)
      .subscribe(meal => {
        this.day.items.push(meal);
      })  
    }    
  }

  deleteItem(item) {
    this.day.items = this.day.items.filter(x => x !== item);
  }

  editIngredient(ingredient) {
    this.ingredientSelectionService.selectIngredient(ingredient);
  }

  deleteIngredient(ingredient) {
    this.ingredients = this.ingredients.filter(x => x != ingredient);
  }
}
