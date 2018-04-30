import { NgModule } from '@angular/core';
import { NutritionComponent } from './nutrition/nutrition';

let components = [
	NutritionComponent,
]

@NgModule({
	declarations: components,
	imports: [],
	exports: components,
	entryComponents: components,
})
export class ComponentsModule {}
