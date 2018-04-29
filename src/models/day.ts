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

export const enum FitItemType {
    meal = 'Meal',
    exercise = 'Exercise'
}

export class FitItem {
    /** name for display */
    display: string;
    /** hour of the day */
    hour: number;
    /** minute in the hour */
    minute: number;
    /** type */
    type: FitItemType;
}

export enum WeightUnit {
    serving = 'serving',
    oz = 'oz',
    g = 'g'
}


export class Ingredient {
    /** name for display */
    name: string;
    /** true for favorite, shows up early in list */
    favorite: boolean;
    /** UTC time in milliseconds it was last used, for sorting */
    lastUsed: number;
    /** nutrition elements set */
    nutrition: NutritionElement[];
    /** weight */
    weight: number;
    /** unit of weight */
    weightUnit: number;
}

/**
 * 
 */
export class Meal {
    name: string;
    favorite: boolean;
    lastUsed: number;
    ingredients: Ingredient[] = [];
}

export class Exercise {
    name: string;
    favorite: boolean;
    lastUsed: number;
    calories: number;
}

export class Day {
    /** number of days since 1/1/1970 */
    dayNumber: number;
    /** config for the day, i.e. calories and nutrition targets */
    config: DayConfig;
    /** List of fit items, meals and exercises, newest first */
    items: FitItem[];
}
