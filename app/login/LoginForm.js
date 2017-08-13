import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute, Redirect } from 'react-router';
import { loginStatus } from '../actions/index';
import { LoginFormValidator } from './LoginFormValidator';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          errors:{},
          serverError : false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        this.setState({serverError:false});
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }

       const { errors, isValid } = LoginFormValidator(formData);

        this.setState({
          errors: errors,
          isValid : isValid
        })


        if(isValid){
            this.props.loginStatus(formData).then((response) => {
                if(!response.error){
                    localStorage.setItem("key", response.payload.data.key);
                    localStorage.setItem("isAuthenticated", true);
                    browserHistory.push('/dashboard');
                    this.setState({serverError:false});
                }else{
                    this.setState({serverError:true});
                }
            }) ;    
        }
    }

    render(){
        const { errors, serverError } = this.state;
        return (
         <div>
            <form>
                 <div className="form">
                    { serverError && 
                        <div className="error">
                            <p className="center">Email or password is incorrect</p>
                        </div>
                    }
                    <div className={ errors.email ? 'input error' :  'input'}>
                        <label >E-mail</label>
                        <input ref="email" type="text" id="email" placeholder="E-mail" />
                        { errors.email && <p>{errors.email}</p>}
                    </div>
                    <div className={ errors.password ? 'input error' :  'input'}>
                        <label >Password</label>
                        <input ref="password" type="password" id="password" placeholder="Password" />
                        { errors.password && <p>{errors.password}</p>}
                    </div>
                    <div className="password clearfix">     
                        <a  onClick={this.props.forgetPasswordPopup.bind(this)}>Forgot Password?</a>
                    </div>
                    <div className="input">
                        <div className="btn" onClick={this.handleSubmit}>Login</div>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        loginStatusData: state.loginStatus.all,
    };                  
}

export default connect(mapStateToProps, { loginStatus })( LoginForm );  