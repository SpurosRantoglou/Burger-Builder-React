import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


//Our ingredients its an object.. So we have to transform it to array
const Burger = (props) => {

    //It will gives us an array from keys
    let transformedIngredients = Object.keys(props.ingredients).map(
        igKey =>{
            return[...Array(props.ingredients[igKey])].map(
                (_, i) =>{
                    return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
        }
    ).reduce((arr,el)=>{
        return arr.concat(el)
    }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please add some ingredients</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;
