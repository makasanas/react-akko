import React, { Component } from 'react';
import validator from 'validator';
import isEmpty from 'lodash';

export function CatalogFormValidator(data, mode) {	
    let errors = {};

    if(validator.isEmpty(data.quantity)){
        errors.quantity = 'Quantity is requred';
    }

    if(mode === 'Add'){
        if(data.category === 'none' ){
            errors.category = 'Category is requred';
        }
    }

   
    if(data.location === 'none' ){
        errors.location = 'Location is requred';
    }           

    return {
      errors,
      isValid: _.isEmpty(errors)
    }
}
	
