import React, { Component } from 'react';
import Header from './Header';
import AppHeader from './appHeader';
import ChangeHome from './changeHome';	

class CheckHeader extends Component{
	constructor(props){
        super(props);
        this.state = {
            popup:false,
            homeId: localStorage.getItem("homeId") !== null ? localStorage.getItem("homeId") : '1', 
            homeName: localStorage.getItem("homeName") !== null ? localStorage.getItem("homeName") : '123 address', 
        }
        this.changeHomePopup = this.changeHomePopup.bind(this);
        this.handlerChangeHome = this.handlerChangeHome.bind(this);
    }

	changeHomePopup() {
	   	if(!this.state.popup){
	   		this.setState({popup:true});
	   	}else{
	   		this.setState({popup:false});
	   	}
	} 

	handlerChangeHome(id,name){
		this.setState({homeId:id});
		this.setState({homeName:name});
		this.setState({popup:false});
    }

	render() {
		const childrenWithProps = React.Children.map(this.props.children,
		    (child) => React.cloneElement(child, {
		       homeId: this.state.homeId
		    })
	    );
	    return localStorage.getItem("isAuthenticated") == "true" ? <div><AppHeader homeName={this.state.homeName} changeHomePopup={this.changeHomePopup} />{childrenWithProps}<ChangeHome changeHomePopup={this.changeHomePopup} handlerChangeHome={this.handlerChangeHome}  popup={this.state.popup}/></div> : <div><Header/>{this.props.children}</div>;
	}
}
 
export default CheckHeader;
