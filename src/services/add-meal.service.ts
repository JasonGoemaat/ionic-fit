import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Meal } from '../models';

@Injectable()
export class AddMealService {
    constructor(public app: App) {

    }

    current: Observable<Meal>;
    subscriber: Subscriber<Meal>;

    /**
     * Called from 'Add Meal' button, opens up view to the AddMealPage
     * @param meal existing meal, would mean editing
     */
    selectMeal(meal: Meal = null) : Observable<Meal> {
        this.current = new Observable<Meal>(subscriber => {
            this.subscriber = subscriber;
        });
        this.app.getRootNav().push('AddMealPage', {meal});
        return this.current;
    }

    /**
     * Called from the AddMealPage, completes the subscription created
     * by calling selectMeal() with the new meal.
     * @param meal meal to add
     */
    completeMeal(meal: Meal) {
        if (this.subscriber) {
            this.subscriber.next(meal);
            this.subscriber.complete();
            this.current = null;
            this.subscriber = null;
            this.app.getRootNav().pop();
        }
    }
}
