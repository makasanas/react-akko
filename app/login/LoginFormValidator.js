import React, { Component } from 'react';
import validator from 'validator';
import isEmpty from 'lodash';



export function LoginFormValidator(data) {	
    let errors = {};

    if(validator.isEmpty(data.email)){
        errors.email = 'Email is requred';
    }else if(!validator.isEmail(data.email)){
        errors.email = 'Email is not valid';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password is requred';
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    }
}
	
