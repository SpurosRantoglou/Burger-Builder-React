import React, {Component } from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{

    //We have to be careful, because a prop may be changed and another not,
    //so maybe sometimes we need to check more than one states to pass the changed state
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show       
    }

    componentDidUpdate(){
        console.log('[Modal] WillUpdate')
    }
    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;