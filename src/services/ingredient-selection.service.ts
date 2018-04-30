import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class IngredientSelectionService {
    constructor(public app: App) {

    }

    current: Observable<any>;
    subscriber: Subscriber<any>;

    selectIngredient(ingredient: any = null) : Observable<any> {
        this.current = new Observable<any>(subscriber => {
            this.subscriber = subscriber;
        });
        this.app.getRootNav().push('IngredientSelectPage', {ingredient});
        return this.current;
    }

    completeIngredient(ingredient: any) {
        if (this.subscriber) {
            this.subscriber.next(ingredient);
            this.subscriber.complete();
            this.current = null;
            this.subscriber = null;
            this.app.getRootNav().pop();
        }
    }
}
