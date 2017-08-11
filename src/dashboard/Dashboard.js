import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
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
                        <div className="icon">
                            <svg  x="0px" y="0px" viewBox="0 0 512.001 512.001" ><path fill="#FE9379" d="M384.609,198.64v54.536c0,63.393-50.222,115.269-112.967,117.95v-54.228h-31.283v54.228c-62.745-2.681-112.967-54.557-112.967-117.95V198.64H96.109v54.536c0,80.645,64.251,146.554,144.25,149.253v78.289h-54.745v31.283h140.774v-31.283h-54.745v-78.289c79.999-2.7,144.25-68.609,144.25-149.253V198.64L384.609,198.64L384.609,198.64z"/><path fill="#DFDFE2" d="M363.406,94.318V238.22c0,52.003-42.316,94.318-94.318,94.318h-26.173c-52.003,0-94.318-42.315-94.318-94.318V94.318C148.596,42.316,190.911,0,242.914,0h26.173C321.09,0,363.406,42.316,363.406,94.318z"/><g><rect x="148.594" y="200.107" fill="#FE9379" width="214.81" height="31.283"/><rect x="148.594" y="98.959" fill="#FE9379" width="214.81" height="31.283"/></g><path fill="#FE633E" d="M415.888,198.637v54.537c0,80.648-64.245,146.551-144.246,149.251v78.291h54.745v31.283h-70.449V316.897h15.704v54.224c62.743-2.68,112.963-54.558,112.963-117.947v-54.537L415.888,198.637L415.888,198.637z"/><path fill="#D7D6D9" d="M363.406,94.318V238.22c0,51.148-40.939,92.921-91.764,94.287c-0.845,0.022-1.7,0.031-2.555,0.031h-13.149V0h13.149C321.09,0,363.406,42.316,363.406,94.318z"/><g><rect x="255.937" y="200.107" fill="#FE633E" width="107.468" height="31.283"/><rect x="255.937" y="98.959" fill="#FE633E" width="107.468" height="31.283"/></g></svg>
                        </div>
                        <div className="info">
                            <h3 className="number">{item.count}</h3>
                            <h3>{item.name}</h3>
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
                                    <img src="/assets/img/gas-shutoff.JPG" alt={"gas"}/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info">
                                    <h3>Water</h3>
                                </div>
                                <div className="icon">
                                    <img src="/assets/img/water-shutoff.JPG" alt={"water"}/>
                                </div>
                            </div>
                            <div className="item">
                                 <div className="info">
                                    <h3>Electricity</h3>
                                </div>
                                <div className="icon">
                                    <img src="/assets/img/electrical-shutoff.JPG" alt={"electrical"}/>
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