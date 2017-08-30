import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute, Redirect } from 'react-router';
import { forgotPasswordRequest } from '../actions/index';
import { ForgetPasswordValidator } from './ForgetPasswordValidator';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update:false,
            errors:{},   
            serverError : false,
            server: false,  
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        this.setState({serverError:false});
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }

       console.log(formData);

       const { errors, isValid } = ForgetPasswordValidator(formData);
       
        this.setState({
            errors: errors,
            isValid : isValid
        })
        if(isValid){
            this.props.forgotPasswordRequest(formData).then((response) => {
                console.log(response);
                if(!response.error){
                    this.setState({serverError:false});
                    this.setState({server:true});
                    // window.setTimeout(
                    //     this.props.forgetPasswordPopup(), 
                    // 3000);
                }else{
                    this.setState({serverError:true});
                    this.setState({server:false});
                     
                }
            });    
        }
    }
    
    render(){
        const { server, errors, serverError } = this.state;
        return (
            <div className={this.props.popup ? 'forgetPassword active' :  'forgetPassword'}>
                <div className="form">
                    { serverError && 
                        <div className="error">
                            <p className="center">Email or password is incorrect</p>
                        </div>
                    }
                    { server && 
                        <div className="info">
                            <p className="center">Password reset e-mail has been sent check you mail.</p>
                        </div>
                    }
                    <div className="close" onClick={this.props.forgetPasswordPopup.bind(this)}>X</div>              
                    <h1>Forgot Password</h1>
                    <div className={ errors.femail ? 'input error' :  'input'}>
                        <label>E-mail</label>
                        <input ref="email" type="text" id="email" placeholder="E-mail"/>
                        { errors.femail && <p>{errors.femail}</p>}
                    </div>
                    <div className="input">
                        <div className="btn" onClick={this.handleSubmit}>Submit</div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        forgotPassword: state.forgotPassword.all,
    };                  
}

export default connect(mapStateToProps, { forgotPasswordRequest })( ForgetPassword );  