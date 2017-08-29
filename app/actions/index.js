import  axios from 'axios';
	
const ROOT_URL = process.env.BACKEND_URL || 'https://cloudhome-staging.herokuapp.com';

var config = {
    headers: {
    	'Authorization': "Bearer "+localStorage.getItem("key"),
    	'Content-Type': "application/json"
    }
};

export const login = 'login';
export function loginStatus(data) {		
	const request = axios.post(`${ROOT_URL}/rest-auth/login/`, data);
	return{
		type:login,	
		payload:request		
	};
}

export const forgotPassword = 'forgotPassword';		
export function forgotPasswordRequest(data) {
	const request = axios.post(`${ROOT_URL}/rest-auth/password/reset/`, data);	

	return{
		type:forgotPassword,	
		payload:request		
	};
}

export const houses = 'houses';
export function housesData() {		
	const request = axios.get(`${ROOT_URL}/api/home/houses/`, config);	
		
	return{
		type:houses,	
		payload:request		
	};
}

export const assetType = 'assetType';
export function assetTypeData(id) {		
	const request = axios.get(`${ROOT_URL}/api/home/asset-types`);						
	return{
		type:assetType,	
		payload:request		
	};
}

export const assetTypeCounts = 'assetTypeCounts';
export function assetTypeCountsData(id) {		
	const request = axios.get(`${ROOT_URL}/api/home/assets?house=`+id);						
	return{
		type:assetTypeCounts,	
		payload:request		
	};
}

export const asset = 'asset';		
export function assetData(id,type) {
	var request = '';
	if(type == undefined){
		request = axios.get(`${ROOT_URL}/api/home/houses/`+id+`/assets/`, config);
	}else{
		request = axios.get(`${ROOT_URL}/api/home/houses/`+id+`/assets/?type=`+type, config);	
	}		
						
	return{
		type:asset,	
		payload:request		
	};
}

export const locations = 'locations';		
export function locationsData(id) {
	const request = axios.get(`${ROOT_URL}/api/home/locations?house=`+id);						
	return{
		type:locations,	
		payload:request		
	};
}


export const catalogOptions = 'catalogOptions';		
export function catalogOptionsData(category) {
	const request = axios.options(`${ROOT_URL}/api/catalog/`+category, config);						
	return{
		type:catalogOptions,	
		payload:request		
	};
}

export const assetsOptions = 'assetsOptions';		
export function assetsOptionsData(category) {
	const request = axios.options(`${ROOT_URL}/api/home/assets/`+category, config);						
	return{
		type:assetsOptions,	
		payload:request		
	};
}

export const catalogPost = 'catalogPost';		
export function catalogPostData(category,data) {
	const request = axios.post(`${ROOT_URL}/api/catalog/`+category, data);						
	return dispatch => {
		dispatch({ type: catalogPost, payload:request }).then(function(res){
			console.log(res);
			data['item'] = res.payload.data.id;
			console.log(data);
			return dispatch(assetsPostData(category, data));
		})
	};
}

export const assetsPost = 'assetsPost';		
export function assetsPostData(category,data) {			
	const request = axios.post(`${ROOT_URL}/api/home/assets/`+category, data);						
	return{
		type:assetsPost,	
		payload:request
	};
}


export const catalogDelete = 'catalogDelete';		
export function catalogDeleteData(category,id,itemId,type,homeId) {
	const request = axios.delete(`${ROOT_URL}/api/catalog/`+category+itemId);	

	return dispatch => {
		dispatch({ type: catalogDelete, payload:request }).then(function(res){
			if(type === 'all' ){
				return dispatch(assetData(homeId, undefined));
			}else{
				return dispatch(assetData(homeId,type));
			}
			
		})
	};
}

export const assetsDelete = 'assetsDelete';		
export function assetsDeleteData(category,id) {			
	const request = axios.delete(`${ROOT_URL}/api/home/assets/`+category+id);						
	return{
		type:assetsDelete,	
		payload:request
	};
}