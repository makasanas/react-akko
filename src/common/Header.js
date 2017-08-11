import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Redirect, Link } from 'react-router';
import './custom.scss';     

class Header extends Component {
    constructor(props) {
        super(props);
        this.checklogin = this.checklogin.bind(this);
    } 

    checklogin = function() {           
      if(!(localStorage.getItem("isAuthenticated") == "false" ||  localStorage.getItem("isAuthenticated") === null)){
          return "Logout";     
      }else{
          return "Login";
      }
    }
    
    logout = function(){
        if(localStorage.getItem("isAuthenticated")){
            browserHistory.push('/');
            localStorage.removeItem("key");
            localStorage.setItem("isAuthenticated", false);
        }
    }

    render(){
        return (   
            <div>       
                <header>      
                    <div className="container">
                        <div className="head clearfix">
                            <div className="logo">
                                 <Link to="index.html">
                                     <img src="assets/img/logo4.png" alt={"logo"}/>
                                </Link>
                            </div>
                            <div className="menu">
                                <ul>
                                    <li><a onClick={this.logout}>{this.checklogin()}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}


export default Header;