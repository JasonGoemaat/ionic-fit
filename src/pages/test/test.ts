import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Test page, used for selecting other test pages.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  testPages = [
    'TestNutritionPage'
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
  ) {
  }

  selectPage(page) {
    this.app.getRootNav().push(page);
  }
}
