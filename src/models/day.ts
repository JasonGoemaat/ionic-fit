export const enum NutritionTypes {
    fat,
    fatSaturated,
    fatPolyunsaturated,
    fatMonounsaturated,
    cholesterol,
    sodium,
    potassium,
    carbs,
    dietaryFiber,
    sugars,
    protein,
    vitaminA,
    calcium,
    vitaminD,
    vitaminB12,
    vitaminC,
    iron,
    vitaminB6,
    magnesium,
    water
}

export const NutritionTypeNames = {
    [NutritionTypes.fat]: 'Total Fat',
    [NutritionTypes.fatSaturated]: 'Saturated Fat',
    [NutritionTypes.fatPolyunsaturated]: 'Polyunsaturated fat',
    [NutritionTypes.fatMonounsaturated]: 'Monounsaturated fat',
    [NutritionTypes.cholesterol]: 'Cholesterol',
    [NutritionTypes.sodium]: 'Sodiuim',
    [NutritionTypes.potassium]: 'Potassium',
    [NutritionTypes.carbs]: 'Total Carbohydrate',
    [NutritionTypes.dietaryFiber]: 'Dietary fiber',
    [NutritionTypes.sugars]: 'Sugar',
    [NutritionTypes.protein]: 'Protein',
    [NutritionTypes.vitaminA]: 'Vitamin A',
    [NutritionTypes.calcium]: 'Calcium',
    [NutritionTypes.vitaminD]: 'Vitamin D',
    [NutritionTypes.vitaminB12]: 'Vitamin B-12',
    [NutritionTypes.vitaminC]: 'Vitamin C',
    [NutritionTypes.iron]: 'Iron',
    [NutritionTypes.vitaminB6]: 'Vitamin B-6',
    [NutritionTypes.magnesium]: 'Magnesium',
    [NutritionTypes.water]: 'Water'
}

export class NutritionElement {
    constructor(obj: any) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }

    type: NutritionTypes;
    value: number;
}

export class DayConfig {
    /** for display, i.e. 'Rest Day', 'Cardio', 'Weights', 'Cut', 'Normal' */
    name: string;

    /** list of things you want to watch with high and/or low values, like calories, protein */
    highTargets: NutritionElement[];
    lowTargets: NutritionElement[];
}

export enum FitItemType {
    meal = 'Meal',
    exercise = 'Exercise'
}

export class FitItem {
    /** name for display */
    name: string;
    /** hour of the day */
    hour: number;
    /** minute in the hour */
    minute: number;
    /** type */
    type: FitItemType;
    /** complete?  false for meals before you add ingredients so you can enter a meal and set up the nutrition later */
    complete: boolean;
}

export enum WeightUnit {
    serving = 'serving',
    oz = 'oz',
    g = 'g'
}


export class Ingredient {
    constructor(obj: any) {
        if (obj != null) {
            Object.assign(this, obj);
            if (this.nutrition != null) {
                this.nutrition = this.nutrition.map(x => new NutritionElement(x))
            }
        }
        if (this.nutrition == null) this.nutrition = [];
    }

    /** name for display */
    name: string;
    /** true for favorite, shows up early in list */
    favorite: boolean;
    /** UTC time in milliseconds it was last used, for sorting */
    lastUsed: number;
    /** nutrition elements set */
    nutrition: NutritionElement[];
    /** weight */
    servingWeight: number;
    /** unit of weight */
    servingWeightUnit: WeightUnit;
    /** normal servings per container */
    servingCount: number;
}

export class MealIngredient extends Ingredient {
    constructor(obj: any) {
        super(obj);
    }

    weight: number;
    weightUnit: WeightUnit;

    /**
     * Calculate ingredient nutrition based on quantity.  'oz' and 'g' can
     * be calculated between each other.  If 'serving' is specified for 
     * the ingredient, then only 'serving' is allowed for this record
     * and the conversion
     */
    calculateNutrition() {

    }
}

/**
 * 
 */
export class Meal extends FitItem {
    constructor(obj: any = null) {
        super();

        if (obj != null) {
            Object.assign(this, obj);
            if (this.ingredients != null) {
                this.ingredients = this.ingredients.map(x => new Ingredient(x));
            }
        }
        if (this.ingredients == null) this.ingredients = [];
    }

    ingredients: Ingredient[] = [];
}

export class Exercise extends FitItem {
    constructor(obj: any = null) {
        super();

        if (obj != null) {
            Object.assign(this, obj);
        }
    }

    favorite: boolean;
}

export class Day {
    /** number of days since 1/1/1970 */
    dayNumber: number;
    /** config for the day, i.e. calories and nutrition targets */
    config: DayConfig;
    /** List of fit items, meals and exercises, newest first */
    items: FitItem[];
}
