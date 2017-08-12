import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import CatalogTable from './catalogTable';
import { assetTypeData, assetData } from '../actions/index';

class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assetTypeValue: this.props.location.state != null &&
typeof this.props.location.state.assetTypeValue != null ? this.props.location.state.assetTypeValue : 'all',
            homeId:this.props.homeId,
        }
    }       

    componentWillMount(){ 
        this.props.assetTypeData();

        console.log(this.props.location.state);

        if(this.state.assetTypeValue == 'all'){         
            this.props.assetData(this.props.homeId);     
        }else{
            this.props.assetData(this.props.homeId, this.state.assetTypeValue); 
        }  
    }

    assetTypeChange(event){
        this.setState({assetTypeValue: event.target.value});

        console.log(this.state.assetTypeValue);
        if(event.target.value == 'all'){     
            this.props.assetData(this.props.homeId);     
        }else{
            this.props.assetData(this.props.homeId, event.target.value); 
        } 
    }

    renderAssetType(filters){
        return filters.map((filter, index) => {
            if(filters[0].key != 'all'){            
                filters.unshift({
                    key:'all',
                    name:'All'
                });
            }
            return (
                <option value={filter.key} key={filter.key}>{filter.name}</option>
            )
        })
    }

    render(){ 
       console.log('all state',this.props);
        console.log(this.props.assetType);            
        return (
        	<div className="rightside">    
                <Header/>   
                <div className="content catalog">
                    <div className="tilte clearfix">
                        <h1>Item Catalog</h1>
                        <div className="btn">Add Item</div>
                    </div>
                    <div className="filter clearfix">
                        <div className="left">
                            <div className="input">
                                <select onChange={this.assetTypeChange.bind(this)} value={this.state.assetTypeValue}>
                                    {this.renderAssetType(this.props.assetType)}
                                </select>
                            </div>
                        </div>
                        <div className="right">
                            <div className="input">
                                <input type="text" placeholder="Search item" />
                            </div>
                        </div>
                    </div>
                    <CatalogTable homeId={this.props.homeId} asset={this.props.asset} assetTypeChange={this.assetTypeChange} assetTypeValue={this.state.assetTypeValue}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        assetType: state.assetType.all,
        asset: state.asset.all
    };                  
}

export default connect(mapStateToProps, { assetTypeData, assetData })( Catalog ); 