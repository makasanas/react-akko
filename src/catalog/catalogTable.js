import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assetData } from '../actions/index';

class CatalogTable extends Component {

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
        this.props.assetData(this.props.homeId);            
    }

    renderItem(items){
        return items.map((item, index) => {
            return (
                <tr key={item.id}>
                    <td>
                        <div className="icon">
                            <div className="edit">
                                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" ><g id="Page-1" stroke="none" fill="none" fill-rule="evenodd"><g id="Main" transform="translate(-1823.000000, -561.000000)" fill="#C7C7C7"><g id="Group-4-Copy" transform="translate(768.000000, 305.000000)"><g id="Group-12" transform="translate(723.000000, 0.000000)"><g id="Group-11" transform="translate(0.000000, 70.000000)"><g id="Group-9" transform="translate(2.000000, 184.000000)"><path d="M337.924621,4.92754943 L334.924621,4.92754943 L334.924621,2.92587616 C334.909121,2.43146286 334.935121,2.40944445 335.424621,2.42545784 L337.424621,2.42545784 C337.914621,2.42896077 337.926621,2.40894403 337.924621,2.92587616 L337.924621,4.92754943 L337.924621,4.92754943 Z M337.924621,12.4338242 C336.897621,12.4333238 335.215621,12.4338242 334.924621,12.4338242 L334.924621,5.92838607 L337.924621,5.92838607 L337.924621,12.4338242 L337.924621,12.4338242 Z M336.424621,16.0653599 L334.924621,13.4346608 L337.924621,13.4346608 L336.424621,16.0653599 L336.424621,16.0653599 Z M337.924621,1.4246212 L334.924621,1.4246212 C334.319621,1.4246212 333.924621,1.81444707 333.924621,2.42545784 L333.924621,13.5412499 L335.924621,17.0752041 C336.226621,17.5410936 336.622621,17.5410936 336.924621,17.0752041 L338.924621,13.5412499 L338.924621,2.42545784 C338.924621,1.81444707 338.529621,1.42512162 337.924621,1.4246212 L337.924621,1.4246212 Z" id="Edit" transform="translate(336.424621, 9.424621) rotate(45.000000) translate(-336.424621, -9.424621) "></path></g></g></g></g></g></g></svg>
                            </div>
                            <div className="delete" >
                                <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" ><g id="Page-1" stroke="none" fill="none" fill-rule="evenodd"><g id="Main" transform="translate(-1611.000000, -561.000000)" fill="#C7C7C7"><g id="Group-4-Copy" transform="translate(768.000000, 305.000000)"><g id="Group-12" transform="translate(723.000000, 0.000000)"><g id="Group-11" transform="translate(0.000000, 70.000000)"><g id="Group-9" transform="translate(2.000000, 184.000000)"><path d="M126,17 C122.134,17 119,13.865 119,10 C119,6.135 122.134,3 126,3 C129.866,3 133,6.135 133,10 C133,13.865 129.866,17 126,17 L126,17 Z M126,2 C121.5815,2 118,5.58 118,10 C118,14.42 121.5815,18 126,18 C130.4185,18 134,14.42 134,10 C134,5.58 130.4185,2 126,2 L126,2 Z M128.8585,7.14 C128.6615,6.945 128.343,6.945 128.146,7.14 L125.997,9.29 L123.879,7.17 C123.6835,6.975 123.3665,6.975 123.172,7.17 C122.9765,7.365 122.9765,7.685 123.172,7.88 L125.29,9.995 L123.157,12.13 C122.9605,12.325 122.9605,12.645 123.157,12.845 C123.354,13.04 123.673,13.04 123.87,12.845 L126.003,10.71 L128.121,12.83 C128.3165,13.025 128.6335,13.025 128.8285,12.83 C129.024,12.635 129.024,12.315 128.8285,12.12 L126.71,10.005 L128.8585,7.855 C129.055,7.655 129.055,7.34 128.8585,7.14 L128.8585,7.14 Z" id="delete"></path></g></g></g></g></g></g></svg>
                            </div>
                        </div>
                    </td>
                    <td>Category</td>
                    <td>Loc nickname</td>
                    <td>{item.quantity}</td>
                    <td>{item.item.brand}</td>
                    <td>{item.item.notes}</td>
                    <td>{item.item.serial_number}</td>
                    <td>{item.item.model_number}</td>
                    <td>{item.item.replace_part_number}</td>
                    <td>{item.item.manual_url}</td>
                    <td>Value</td>
                    <td>{item.item.description}</td>
                    <td>{item.item.type}</td>
                    <td>{item.item.shape}</td>
                    <td>{item.item.bulb_size}</td>
                    <td>{item.item.base}</td>
                    <td>{item.item.watts}</td>
                    <td>{item.item.max_watts}</td>
                    <td>{item.item.lumens}</td>
                    <td>{item.item.color}</td>
                    <td>{item.item.fixture}</td>
                </tr>
            )
        })
    }

    render(){

        if(this.state.homeId !== this.props.homeId){
            this.props.assetData(this.props.homeId);
        }

        return (
        	<div className="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Category</th>       
                            <th>Loc nickname</th>
                            <th>Quantity</th>
                            <th>Brand</th>
                            <th>Notes</th>
                            <th>Serialnum</th>
                            <th>Modelnum</th>
                            <th>Replace partnum</th>
                            <th>Manual</th>
                            <th>Value</th>
                            <th>Description</th>
                            <th>Lights type</th>
                            <th>Lights shape</th>
                            <th>Lights bulbsize</th>
                            <th>Lights base</th>
                            <th>Lights watts</th>
                            <th>Lights maxwatts</th>
                            <th>Lights lumens</th>
                            <th>Lights color</th>
                            <th>Lights fixture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItem(this.props.asset)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        asset: state.asset.all
    };                  
}

export default connect(mapStateToProps, { assetData })( CatalogTable ); 