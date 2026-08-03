export interface MealFilterApi {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealFilterApiResponse {
  meals: MealFilterApi[];
}
