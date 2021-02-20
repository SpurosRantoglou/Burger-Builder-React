import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ContactData from './ContactData/ContactData'

export default class Checkout extends Component {
  

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
        
    }


    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelHandler}
                    onCheckoutContinued={this.checkoutContinueHandler}/> 
                    {/* We add ContactData as render to pass some properties  */}         
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }


}

const mapToStateProps = state => {
    return {
        
    }
}