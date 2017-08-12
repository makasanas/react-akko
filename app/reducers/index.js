import { combineReducers } from 'redux';
import loginReducer from './loginStatus';
import housesReducer from './houses';
import assetTypeCountsReducer from './assetTypeCounts';
import assetReducer from './asset';
import assetTypeReducer from './assetType';
import forgotPasswordReducer from './forgotPassword';

const rootReducer = combineReducers({
  	loginStatus: loginReducer,
  	houses: housesReducer,
  	assetTypeCounts: assetTypeCountsReducer,
  	asset: assetReducer,
  	assetType: assetTypeReducer,
  	forgotPassword:forgotPasswordReducer

});

export default rootReducer;
