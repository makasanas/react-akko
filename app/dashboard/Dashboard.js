import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Header from '../common/Header';
import gas from './../assets/img/gasShutoff.jpg';
import water from './../assets/img/waterShutoff.jpg';
import electrical from './../assets/img/electricalShutoff.jpg';         
import { housesData, assetTypeCountsData } from '../actions/index';

class Dashboard extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            homeId:this.props.homeId,
        }
    }   

    componentWillReceiveProps() {
        this.setState({ homeId: this.props.homeId });
    }

    componentWillMount(){
        this.props.assetTypeCountsData(this.props.homeId);
    }

    catalogFilter(key){
        browserHistory.push({pathname: '/catalog', state: {assetTypeValue: key}});

     //   this.context.router.pushState({assetTypeValue:key});
         // this.context.router.push('/catalog');
         // this.context.router.pushState({'assetTypeValue':key});
        // this.context.router.pushState(
        //     {
        //      pathname: '/catalog',
        //      state: {email: key}  
        // });
    }

    getItems(assetTypeCounts){
        let count = [];
        let items  = [];
        for(var i=0;i<assetTypeCounts.length;i++){
            count.push(assetTypeCounts[i].count);
        }
        for(var i=0;i<6;i++){
            var indexOfMaxValue = count.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
            count[indexOfMaxValue] = -1;
            items.push(assetTypeCounts[indexOfMaxValue]);
        }
        return items;
    }


    renderItem(items){
        var items = this.getItems(items);
        if(items[0] != undefined){
            return items.map((item, index) => {
                return (
                    <div className="item" key={item.key}>
                        <div className="itemBox" onClick={this.catalogFilter.bind(this, item.key)}>
                            <div className="icon">
                                <img src={item.icon} />
                            </div>
                            <div className="info">
                                <h3 className="number">{item.count}</h3>
                                <h3>{item.name}</h3>
                            </div>
                        </div>
                    </div>
                )
            })
        }
       
    }


    render(){
        if(this.state.homeId !== this.props.homeId){
            this.props.assetTypeCountsData(this.props.homeId).then(function(){
                var items = this.getItems(this.props.assetTypeCounts);
            });
        }else{
            var items = this.getItems(this.props.assetTypeCounts);
        }
        
        return (
        	<div className="rightside">    
                <Header/>   
                <div className="content">
                    <div className="summary">
                        <h2>Home Catalog Summary</h2>
                        <div className="items clearfix">
                            {this.renderItem(this.props.assetTypeCounts)}
                        </div>
                    </div>
                    <div className="summary emergency">
                        <h2>Emergency Points</h2>
                        <div className="items clearfix">
                            <div className="item">          
                                <div className="info">
                                    <h3>Gas</h3>
                                </div>
                                <div className="icon">
                                    <img src={gas} alt={"gas"}/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info">
                                    <h3>Water</h3>
                                </div>
                                <div className="icon">
                                    <img src={water} alt={"water"}/>
                                </div>
                            </div>
                            <div className="item">
                                 <div className="info">
                                    <h3>Electricity</h3>
                                </div>
                                <div className="icon">
                                    <img src={electrical} alt={"electrical"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { 
        houses: state.houses.all,
        assetTypeCounts: state.assetTypeCounts.all
    };                  
}

export default connect(mapStateToProps, { housesData, assetTypeCountsData })( Dashboard );  