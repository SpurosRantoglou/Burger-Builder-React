import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    bacon: 0.5,
    meat: 2
}

class BurgerBuilder extends Component{


    //State with ingredients amount
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0, 
            meat: 0
        },
        //Base Price for an empty burger
        totalPrice: 2.5,
        //Activity for order button
        purchasable: false,
        //Check for modal to display
        purchasing: false
    }
   
    updatePurchaseState (ingredients) {
    
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]
            }).reduce((sum, el) =>{
                return sum + el 
            }, 0)

            this.setState({purchasable: sum > 0}) //if sum > 0 stores true, else false

    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        //Copy object and the change the value we want to set it to the state 
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 

        //Update the price
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        
        this.setState({ingredients:updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        //Copy object and the change the value we want to set it to the state 
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 

        //Update the price
        const priceDetuction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDetuction
        
        this.setState({ingredients:updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients)

    }

    purchaseHandler = ()=> {
        //"this" on basic methods, don't work correctly if executes on events. That's why we do this ()=>{}
        this.setState({purchasing: true})
    }
    purchaseCancelHandler = ()=> {
        //"this" on basic methods, don't work correctly if executes on events. That's why we do this ()=>{}
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = ()=> {
        alert('Thanks for your order')
        
    }

    render (){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //{salad: true, bacon: false, ...}
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
                
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/>
                    
            </Aux>
        );
    }
}

export default BurgerBuilder;