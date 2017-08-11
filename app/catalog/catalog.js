import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import CatalogTable from './catalogTable';
import { assetTypeData } from '../actions/index';

class Catalog extends Component {

    constructor(props) {
        super(props);
    }       

    componentWillMount(){ 
        this.props.assetTypeData();
    }

    renderAssetType(filters){
        return filters.map((filter, index) => {
            return (
                <option value={filter.key} key={filter.key}>{filter.name}</option>
            )
        })
    }

    render(){             
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
                                <select>
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
                    <CatalogTable homeId={this.props.homeId}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        assetType: state.assetType.all,
    };                  
}

export default connect(mapStateToProps, { assetTypeData })( Catalog ); 