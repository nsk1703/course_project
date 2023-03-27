import { Ingredients } from "../shared/models/ingredients.model";

export interface IRecipe{
    name?: string;
    description?: string;
    imagePath?: string;
    ingredients?: Ingredients[];
}

export class Recipe implements IRecipe{

    constructor( 
        public name?: string, 
        public description?: string, 
        public imagePath?: string, 
        public ingredients?: Ingredients[]
    ){
        
    }
}