import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },

                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },   


            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },


            zipCode : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },

                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 8
                },
                valid: false, 
                touched: false
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            }, 
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },

                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [  {value: 'delivery', displayValue: 'Delivery'},
                                {value: 'pick-up', displayValue: 'Pick Up'} ]
                },

                value: 'delivery',
                validation: {},
                valid: true
            },
            /* phone: '6903050550',
            paymentMethod: 'cash' */
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( {loading: true} )

        const formData = {}

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(
                response => {
                    this.setState( {loading: false} );
                    this.props.history.push('/')
                    console.log(response);
                })
            .catch(error => {
                this.setState( {loading: false} );   
                console.log(error)
                });
    }

    inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value)
        const updatedOrderForm = {
           ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement
        
        //formiIsValid = true because, if at least one element is invalid, it turns to false
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formsElementsArray = [];
        for(let key in this.state.orderForm ){
            //Key is property name of the object
            formsElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })

        }
        let form= ( <form onSubmit={this.orderHandler}>
                        {formsElementsArray.map(formElement => (
                            <Input 
                                key={formElement.id} 
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid} 
                                touched={formElement.config.touched}
                                shouldValidate={formElement.config.validation} /* If we have validation rules returns true else false */
                                changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
                        ))}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                    </form>);
        if(this.state.loading){
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact info</h4>
                {form}
            </div>
        )
    }
}

export default ContactData
