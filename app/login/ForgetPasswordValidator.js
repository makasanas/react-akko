import React, { Component } from 'react';
import validator from 'validator';
import isEmpty from 'lodash';

export function ForgetPasswordValidator(data) {	
    let errors = {};

    if(validator.isEmpty(data.email)){
        errors.femail = 'Email is requred';
    }else if(!validator.isEmail(data.email)){
        errors.femail = 'Email is not valid';
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    }
}
	
