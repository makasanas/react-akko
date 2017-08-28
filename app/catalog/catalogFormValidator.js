import React, { Component } from 'react';
import validator from 'validator';
import isEmpty from 'lodash';

export function CatalogFormValidator(data) {	
    let errors = {};

    if(validator.isEmpty(data.quantity)){
        errors.quantity = 'Quantity is requred';
    }

    if(data.category === 'none' ){
        errors.category = 'Category is requred';
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    }
}
	
