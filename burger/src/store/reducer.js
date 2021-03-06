import * as actionTypes from './actions'


const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    totalPrice: 4
};

/* Ingredient prices variables */
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    bacon: 0.5,
    meat: 2
}

const reducer = (state = initialState, action) =>   {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    /* Syntax for overwrite a specific property of the ingredient object */
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    /* Syntax for overwrite a specific property of the ingredient object */
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }

}

export default reducer;  