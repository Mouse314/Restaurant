import {makeAutoObservable} from 'mobx';

export default class DishStore {
    constructor () {
        this._recipeItems = [
            {id: 1, name: 'Печень гуся', quantity: 2},
            {id: 2, name: 'Барбарис', quantity: 1},
        ];
        makeAutoObservable(this);
    }

    setRecipeItem (recipeItems) {
        this._recipeItems = recipeItems;
    }
    
    get recipeItems() {
        return this._recipeItems;
    }
}