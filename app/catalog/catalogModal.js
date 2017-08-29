import React, { Component } from 'react';
import { connect } from 'react-redux';
import { locationsData, catalogOptionsData, assetsOptionsData, catalogPostData, assetsPostData, catalogUpdateData, assetsUpdateData  } from '../actions/index';
import { CatalogFormValidator } from './catalogFormValidator';

class CatalogModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assetTypeValue: '', 
            errors:{},
            serverError : false,
            option:{},
            itemValue:{
            },     
        }
        this.updateState = this.updateState.bind(this);
        this.addOREditItem = this.addOREditItem.bind(this);
    }    
    
    renderAssetType(filters){   
        return filters.map((filter, index) => {
            if(index != 0){
                return (
                    <option value={filter.url.replace('https://cloudhome-staging.herokuapp.com/api/home/assets/', '').toLowerCase()} key={filter.key}>{filter.name}</option>
                )
            }
        })
    }

    renderLocations(locations){
        return locations.map((location, index) => {
            return (
                <option value={location.id} key={location.id}>{location.name}</option>
            )
        })
    }

    assetTypeChange(event){
        console.log(event.target.value);
        if(event.target.value !== 'none'){
            this.props.assetsOptionsData(event.target.value);
            this.props.catalogOptionsData(event.target.value);

            this.setState({
                assetTypeValue:event.target.value
            });
        }else{
            this.setState({
                assetTypeValue:event.target.value
            });
        }
        
    }

    updateState(Object1, Object2, value){
        var option = {};
        console.log(value);
        if(value  !== 'none'){
            if(Object1.length == undefined && Object2.length == undefined){
                console.log(Object1,Object2)
                var obj = Object.assign(Object1.actions.POST, Object2.actions.POST);
                option = {};
                Object.getOwnPropertyNames(obj).forEach(
                    function (val, idx, array) {
                        option[val] = true;
                    }
                );
            }
        }
        return option;
    }

    handleChange(name,event) {
        const items = this.state.itemValue;
        items[name] = event.target.value;
        this.setState({
            items
        });
    }

    addOREditItem(){
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }

        const { errors, isValid } = CatalogFormValidator(formData, this.props.itemMode);
        this.setState({
          errors: errors,
          isValid : isValid
        })

        console.log(isValid,errors);

        if(isValid){
            if(this.props.itemMode === "Add"){
                this.props.catalogPostData(formData.category, formData);
                this.props.closePopup();
            }else{
                 this.props.catalogUpdateData(this.state.itemValue.category+"/", formData, this.state.itemValue.id, this.state.itemValue.itemId); 
                 this.props.closePopup();               
            } 
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.itemMode !== "Add"){
            const category = nextProps.itemValue.url.replace('https://cloudhome-staging.herokuapp.com/api/home/assets/', '').toLowerCase().split("/");
            console.log(category[0]); 
            const itemValue = {
                id:nextProps.itemValue.id,
                category: nextProps.itemValue.category,
                locationName:nextProps.itemValue.location.name,
                location:nextProps.itemValue.location.id,
                quantity:nextProps.itemValue.quantity,
                notes:nextProps.itemValue.notes,
                itemId:nextProps.itemValue.item.id,
                brand:nextProps.itemValue.item.brand,
                manual_url:nextProps.itemValue.item.manual_url,
                serial_number:nextProps.itemValue.item.serial_number,
                model_number:nextProps.itemValue.item.model_number,
                replace_part_number:nextProps.itemValue.item.replace_part_number,
                description:nextProps.itemValue.item.description,
                type:nextProps.itemValue.item.type,
                shape:nextProps.itemValue.item.shape,
                bulb_size:nextProps.itemValue.item.bulb_size,
                base:nextProps.itemValue.item.base,
                watts:nextProps.itemValue.item.watts,
                max_watts:nextProps.itemValue.item.max_watts,
                lumens:nextProps.itemValue.item.lumens,
                color:nextProps.itemValue.item.color,
                fixture:nextProps.itemValue.item.fixture,
            }
            this.setState({itemValue:itemValue});
        }else{
            this.setState({itemValue:nextProps.itemValue});
        }
    }

    componentDidMount(){
        
        // setInterval(() => {
        //     this.setState({
        //         itemValue:this.props.itemValue
        //     });
        // }, 1000);
    }

    componentWillMount(){ 
        this.props.locationsData(this.props.homeId);

        // this.setState({
        //     itemValue:this.props.itemValue
        // })
    }   

    render(){
        console.log(this.state.itemValue.category);
        console.log(this.props.itemMode);
        const option = this.updateState(this.props.catalogOptions, this.props.assetsOptions, this.state.assetTypeValue);
        // if(this.props.itemMode !== "Add"){
        //     const option = this.updateState(this.props.catalogOptions, this.props.assetsOptions, this.state.assetTypeValue);
        // }
       
        const { errors, serverError } = this.state;         
        return (
            <div className={!this.props.model ? 'modal active':'modal'}  >
                <div className="box">
                    <div className="content addCatalog">
                        <div className="tilte clearfix">
                            <h1>{this.props.itemMode} Item </h1>
                            <div className="btn" onClick={this.addOREditItem}>{this.props.itemMode} Item</div>
                        </div>
                        <form name="salonForm" className="ng-pristine ng-valid-email ng-valid ng-valid-required">
                            <div className="group clearfix">
                                <div className="">
                                    <div className="input">
                                        <label>Category</label>
                                        <select className={ errors.category ? 'error' :  ''} ref="category" onChange={this.assetTypeChange.bind(this)}  disabled={this.props.itemMode === "Update" ? true:false}>
                                            <option value='none'></option>
                                            {this.renderAssetType(this.props.assetTypeCounts)}
                                        </select>
                                        { errors.category && <p  className="error">{errors.category}</p>}
                                    </div>
                                </div>
                                <div className={ option.location ? 'input show' :  'input hide'} >
                                    <label>Location name</label>
                                    <select className={ errors.location ? 'error' :  ''} ref="location" value={this.state.itemValue.location} onChange={this.handleChange.bind(this, "location")} >
                                        <option value='none'></option>
                                        {this.renderLocations(this.props.locations)}
                                    </select>
                                    { errors.location && <p  className="error">{errors.location}</p>}
                                </div>
                            </div>
                            <div className="group clearfix">
                                <div className={ option.quantity ? 'input show' :  'input hide'}>
                                    <label >Quantity</label>
                                    <input className={ errors.quantity ? 'error' :  ''}  ref="quantity" type="number" placeholder="4" value={this.state.itemValue.quantity} onChange={this.handleChange.bind(this, "quantity")}/>
                                    { errors.quantity && <p  className="error">{errors.quantity}</p>}
                                </div>
                                <div className={ option.notes ? 'input show' :  'input hide'}>
                                    <label>Notes</label>
                                    <input ref="notes" type="text" placeholder="Outdoor" value={this.state.itemValue.notes} onChange={this.handleChange.bind(this, "notes")}/>
                                </div>
                            </div>
                            <div className="group clearfix">
                                <div className={ option.brand ? 'input show' :  'input hide'}>
                                    <label>Brand</label>
                                    <input className={ errors.brand ? 'error' :  ''} ref="brand" type="text" placeholder="Philips" value={this.state.itemValue.brand}  onChange={this.handleChange.bind(this, "brand")} />
                                </div>
                                <div className={ option.manual_url ? 'input show' :  'input hide'} >
                                    <label>Manual</label>
                                    <input className={ errors.manual_url ? 'error' :  ''} ref="manual_url" type="text" placeholder="http://www.anaheimmfg.com/product/quick-hot-tank-1300-watt-heating-element-1-year-warranty/" value={this.state.itemValue.manual_url}  onChange={this.handleChange.bind(this, "manual_url")} />
                                </div>
                            </div>
                            <div className="group clearfix">
                                <div className={ option.serial_number ? 'input show' :  'input hide'}>
                                    <label>Serial Number</label>
                                    <input ref="serial_number" type="text" placeholder="D-1F5-00846-6"  value={this.state.itemValue.serial_number}  onChange={this.handleChange.bind(this, "serial_number")}/>
                                </div>
                                <div className={ option.model_number ? 'input show' :  'input hide'}>
                                    <label>Model Number</label>
                                    <input ref="model_number" type="text"  placeholder="WL-LED100"  value={this.state.itemValue.model_number}  onChange={this.handleChange.bind(this, "model_number")} />
                                </div>
                            </div>
                            <div className="group clearfix">
                                <div className={ option.replace_part_number ? 'input show' :  'input hide'}>
                                    <label>Replace partnum</label>
                                    <input ref="replace_part_number" type="text" placeholder="34-21 Zion Arcade" value={this.state.itemValue.replace_part_number}  onChange={this.handleChange.bind(this, "replace_part_number")} />
                                </div>
                                <div className={ option.description ? 'input show' :  'input hide'}>
                                    <label>Description</label>
                                    <input ref="description" type="text" placeholder="34-21 Zion Arcade" value={this.state.itemValue.description}  onChange={this.handleChange.bind(this, "description")}  />
                                </div>
                            </div>
                            
                            <div className="group clearfix">
                                <div className={ option.type ? 'input show' :  'input hide'}>
                                    <label>Lights type</label>
                                    <input ref="type"  type="text" placeholder="Incandescent" value={this.state.itemValue.type}  onChange={this.handleChange.bind(this, "type")} />
                                </div>
                                <div className={ option.shape ? 'input show' :  'input hide'}>
                                    <label>Lights shape</label>
                                    <input ref="shape" type="text" placeholder="Reflector/Flood" value={this.state.itemValue.shape}  onChange={this.handleChange.bind(this, "shape")} />
                                </div>
                            </div>
                            <div className="group clearfix">
                                <div className={ option.bulb_size ? 'input show' :  'input hide'}>
                                    <label>Lights bulbsize</label>
                                    <input ref="bulb_size" type="text" placeholder="Medium"  value={this.state.itemValue.bulb_size}  onChange={this.handleChange.bind(this, "bulb_size")} />
                                </div>
                                <div className={ option.base ? 'input show' :  'input hide'}>
                                    <label>Lights base</label>
                                    <input ref="base" type="text" placeholder="Medium" value={this.state.itemValue.base}  onChange={this.handleChange.bind(this, "base")} />
                                </div>
                            </div>
                            <div className="group clearfix">
                                <div className={ option.watts ? 'input show' :  'input hide'}>
                                    <label>Lights watts</label>
                                    <input ref="watts" type="text" placeholder="65" value={this.state.itemValue.watts}  onChange={this.handleChange.bind(this, "watts")}  />
                                </div>
                                <div className={ option.max_watts ? 'input show' :  'input hide'}>
                                    <label>Lights maxwatts</label>
                                    <input ref="max_watts" type="text" placeholder="40" value={this.state.itemValue.max_watts}  onChange={this.handleChange.bind(this, "max_watts")} />
                                </div>
                            </div>
                            <div className="group clearfix">
                                <div className={ option.lumens ? 'input show' :  'input hide'}>
                                    <label>Lights lumens</label>
                                    <input ref="lumens" type="text" placeholder="620" value={this.state.itemValue.lumens}  onChange={this.handleChange.bind(this, "lumens")}  />
                                </div>
                                <div className={ option.color ? 'input show' :  'input hide'}>
                                    <label>Lights color</label>
                                    <input ref="color" type="text" placeholder="China White" value={this.state.itemValue.color}  onChange={this.handleChange.bind(this, "color")}  />
                                </div>
                            </div>
                            <div className="group clearfix">
                                <div className={ option.fixture ? 'input show' :  'input hide'}>
                                    <label>Lights fixture</label>
                                    <input ref="fixture" type="text" placeholder="Recessed Can" value={this.state.itemValue.fixture}  onChange={this.handleChange.bind(this, "fixture")}  />
                                </div>
                            </div>
                            <div className="single clearfix">
                                <div className="input">
                                    <div className="btn" onClick={this.addOREditItem}>{this.props.itemMode} Item</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="overlay" onClick={this.props.closePopup.bind(this)}></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        locations: state.locations.all,
        catalogOptions: state.catalogOptions.all,
        assetsOptions: state.assetsOptions.all,
        catalogPost: state.catalogPost.all,
        assetsPost: state.assetsPost.all,
        catalogUpdate: state.catalogUpdate.all,
        assetsUpdate: state.assetsUpdate.all
    };                  
}

export default connect(mapStateToProps, { locationsData, assetsOptionsData, catalogOptionsData, catalogPostData, assetsPostData, assetsUpdateData, catalogUpdateData })( CatalogModal ); 