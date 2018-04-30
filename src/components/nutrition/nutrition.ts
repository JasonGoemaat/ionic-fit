import { Component } from '@angular/core';

/**
 * Generated class for the NutritionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nutrition',
  templateUrl: 'nutrition.html'
})
export class NutritionComponent {

  text: string;

  constructor() {
    console.log('Hello NutritionComponent Component');
    this.text = 'Hello World';
  }

}
