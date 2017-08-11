import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute, Redirect, Link } from 'react-router';
import { housesData } from '../actions/index';

class ChangeHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update:true
        }
    } 

    componentWillMount(){ 
        this.props.housesData().then(function(response){
            if(localStorage.getItem("homeId") === null){
                localStorage.setItem("homeId", response.payload.data[0].id);
                localStorage.setItem("homeName", response.payload.data[0].address1);
            }
        });  
    }   

    handlerChangeHome(id, name){
        localStorage.setItem("homeId", id);
        localStorage.setItem("homeName", name);
        this.setState({update:false});
        this.props.handlerChangeHome(id, name);
    }

    renderhouse(houses){
        return houses.map((house, index) => {
            let selected = false;
            if(localStorage.getItem("homeId") == house.id){
                selected = true;
            }
            return (
                <div className={selected ? 'house active':'house'} onClick={this.handlerChangeHome.bind(this, house.id, house.address1)}  key={house.id}>
                    <div className="icon">
                        <svg enable-background="new 0 0 48 48" height="48px" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px"><path clip-rule="evenodd" d="M44.715,23.711c-0.381,0.382-1,0.382-1.381,0l-8.939-8.938  c-0.064-0.051-0.119-0.106-0.17-0.171l-3.83-3.829c-0.064-0.051-0.119-0.106-0.17-0.171L24,4.377L4.667,23.711  c-0.381,0.382-1,0.382-1.381,0c-0.381-0.381-0.381-1,0-1.381L23.191,2.425c0.031-0.047,0.053-0.101,0.094-0.144  C23.482,2.085,23.742,1.994,24,2c0.258-0.006,0.518,0.084,0.715,0.281c0.043,0.042,0.062,0.096,0.096,0.144L30,7.616V4.997  c0,0,0,0,0,0c0-0.552,0.447-1,1-1h4c0.277,0,0.527,0.112,0.707,0.293C35.889,4.471,36,4.721,36,4.997v8.619l8.715,8.714  C45.096,22.711,45.096,23.33,44.715,23.711z M34,5.997h-2v3.619l2,2V5.997z M10,21.997c0.552,0,1,0.448,1,1v19c0,1.105,0.896,2,2,2  h6l0,0v-13c0-0.553,0.447-1,1-1h8c0.553,0,1,0.447,1,1v13l0,0h6c1.105,0,2-0.895,2-2v-19c0-0.552,0.447-1,1-1s1,0.448,1,1v19  c0,2.209-1.791,4-4,4H13c-2.209,0-4-1.791-4-4v-19C9,22.444,9.448,21.997,10,21.997z M27,43.996v-12h-6v12l0,0H27L27,43.996z" fill-rule="evenodd"/></svg>
                    </div>
                    <div className="address">
                        <p className="name">{house.address1}, {house.address2}</p>
                        <p>{house.city}, {house.st} - {house.zip_code}</p>
                    </div>
                </div>  
            )
        })
    }

    render(){
        return (
            <div className={this.props.popup ? 'modal housesModal active' :  'modal housesModal'}>
                <div className="box">
                    <div className="close" onClick={this.props.changeHomePopup.bind(this)}>
                        <svg height="512px" id="Layer_1" viewBox="0 0 512 512" width="512px" ><path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
                    </div>
                    <div className="houses clearfix">
                        {this.renderhouse(this.props.houses)}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        houses: state.houses.all,
    };                  
}

export default connect(mapStateToProps, { housesData })( ChangeHome );