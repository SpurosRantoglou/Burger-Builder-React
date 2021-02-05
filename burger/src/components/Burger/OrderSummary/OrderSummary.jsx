import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    //We get our ingredients in object format. So we need to transform it
    const ingredientSummary = Object.keys( props.ingredients )
        .map(ingredientKey =>{
            return (
            <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
            </li>);
        });
    
    return (
        <Aux>
            <h3>Your order</h3>
            <p>This burger contains: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
            
        </Aux>
    );
}

export default OrderSummary;
