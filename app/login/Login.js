import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute, Redirect } from 'react-router';
import {Form, Field} from 'simple-react-forms';
import LoginForm from './LoginForm';
import ForgetPassword from './forgetPassword';
import { loginStatus } from '../actions/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup:false,
        }

        this.forgetPasswordPopup = this.forgetPasswordPopup.bind(this);
    }           
    
    forgetPasswordPopup() {
        console.log(this.state.popup);
        if(!this.state.popup){
            this.setState({popup:true});
        }else{
            this.setState({popup:false});
        }
    } 

    render(){
        if(localStorage.getItem("isAuthenticated") == "true"){
            browserHistory.push('/dashboard');
        }       

        return (
        	<div>
                <div className="loginsection">
                    <div className="container">
                        <div className="box">
                            <div className="text">
                                <p href="#login">Login</p>
                            </div>  
                            <div className="filed clearfix">
                                <div className="filedbox active" id="login">
                                   <LoginForm forgetPasswordPopup={this.forgetPasswordPopup}/>
                                </div>
                                <ForgetPassword popup={this.state.popup} forgetPasswordPopup={this.forgetPasswordPopup}/>
                            </div>
                        </div>
                    </div>
                </div> 
                <div  className="login-bg"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        loginStatusData: state.loginStatus.all,
    };                  
}

export default connect(mapStateToProps, { loginStatus })( Login );      