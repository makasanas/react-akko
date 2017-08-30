import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import CatalogTable from './catalogTable';
import CatalogModal from './catalogModal';
import { assetTypeCountsData, assetData, catalogOptionsData, assetsOptionsData, catalogDeleteData, assetsDeleteData, ROOT_URL } from '../actions/index';

class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assetTypeValue: this.props.location.state != null &&
typeof this.props.location.state.assetTypeValue != null ? this.props.location.state.assetTypeValue : 'all',
            homeId:this.props.homeId,
            model:true,            
            itemMode:"Add",
            itemValue:{}
        }
        this.addPopup = this.addPopup.bind(this);
        this.updatePopup = this.updatePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }       

    componentWillMount(){ 
        this.props.assetTypeCountsData(this.props.homeId);
        if(this.state.assetTypeValue == 'all'){         
            this.props.assetData(this.props.homeId);     
        }else{
            this.props.assetData(this.props.homeId, this.state.assetTypeValue); 
        }  
    }

    assetTypeChange(event){
        this.setState({assetTypeValue: event.target.value});
        if(event.target.value == 'all'){     
            this.props.assetData(this.props.homeId);     
        }else{
            this.props.assetData(this.props.homeId, event.target.value); 
        } 
    }

    renderAssetType(filters){
        return filters.map((filter, index) => {
            return (
                <option value={filter.key} key={filter.key}>{filter.name}</option>
            )
        })
    }

    closePopup(){
        this.setState({
            model:!this.state.model,
        });
    }

    addPopup(){
        this.setState({
            model:!this.state.model,
            itemMode:"Add",
            itemValue:{}                    
        });
    }

    deleteItem(item){
        const category = item.url.replace(ROOT_URL+'/api/home/assets/', '').toLowerCase().split("/");
        this.props.catalogDeleteData(category[0]+"/", item.id, item.item.id, this.state.assetTypeValue , this.state.homeId);
    }

    updatePopup(item){
        const category = item.url.replace(ROOT_URL+'/api/home/assets/', '').toLowerCase().split("/");
        item.category = category[0];
        this.props.assetsOptionsData(item.category);
        this.props.catalogOptionsData(item.category);
        this.setState({
            model:!this.state.model,
            itemMode:"Update",
            itemValue:item
        });             
    }


    render(){      
        return (
        	<div className="rightside">    
                <Header/>   
                <div className="content catalog">
                    <div className="tilte clearfix">
                        <h1>Item Catalog</h1>
                        <div className="btn" onClick={this.addPopup}>Add Item</div>
                    </div>
                    <div className="filter clearfix">
                        <div className="left">
                            <div className="input">
                                <select onChange={this.assetTypeChange.bind(this)} value={this.state.assetTypeValue}>
                                    <option value='all'>All</option>
                                    {this.renderAssetType(Object.assign(this.props.assetTypeCounts))}
                                </select>
                            </div>
                        </div>
                        {/* <div className="right">
                            <div className="input">
                                <input type="text" placeholder="Search item" />
                            </div>
                        </div> */}
                    </div>      
                    <CatalogTable homeId={this.props.homeId} asset={this.props.asset} assetTypeChange={this.assetTypeChange} assetTypeValue={this.state.assetTypeValue} updatePopup={this.updatePopup} deleteItem={this.deleteItem}/>
                </div>
                <CatalogModal homeId={this.props.homeId} assetTypeValue={this.state.assetTypeValue} catalogOptions={this.props.catalogOptions} assetsOptions={this.props.assetsOptions} itemValue={this.state.itemValue} model={this.state.model} itemMode={this.state.itemMode} closePopup={this.closePopup} assetTypeCounts={this.props.assetTypeCounts}/>            
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        assetTypeCounts: state.assetTypeCounts.all,
        asset: state.asset.all,
        catalogOptions: state.catalogOptions.all,
        assetsOptions: state.assetsOptions.all,
        catalogDelete:state.catalogDelete.all,
        assetsDelete:state.assetsDelete.all
    };                  
}

export default connect(mapStateToProps, { assetTypeCountsData,assetsOptionsData, catalogOptionsData, assetData, catalogDeleteData, assetsDeleteData })( Catalog ); 