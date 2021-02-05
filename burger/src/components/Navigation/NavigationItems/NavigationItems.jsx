import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' active >Burger Build</NavigationItem>
        <NavigationItem link='/'>Orders</NavigationItem>
    </ul>
);

export default NavigationItems;
