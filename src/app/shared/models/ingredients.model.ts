export interface IIngredients{
    name?: string; 
    amount?: number;
}
export class Ingredients implements IIngredients{
    constructor(
        public name: string, 
        public amount: number
    ){}
}