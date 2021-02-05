import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={BurgerLogo} alt="Burger Builder"/>
    </div>
);


export default Logo;
