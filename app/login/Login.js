import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute, Redirect } from 'react-router';
import {Form, Field} from 'simple-react-forms';
import LoginForm from './LoginForm';
import { loginStatus } from '../actions/index';

class Login extends Component {
    constructor(props) {
        super(props);
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
                                   <LoginForm/>
                                </div>
                                <div className="forgetPassword ">
                                    <div className="form">
                                        <div className="close">X</div>              
                                        <h1>Forgot Password</h1>
                                        <div className="input">
                                            <label>E-mail</label>
                                            <input type="text" id="email" placeholder="E-mail"/>
                                        </div>
                                        <div className="input">
                                            <div className="btn">Submit</div>
                                        </div>
                                    </div>
                                </div>
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