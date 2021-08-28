import React from 'react';
import './input.scss';

export function Input({register,disabled,name,type,placeholder,id}) {
    return <input disabled={disabled} {...register(name, {
        required: "required",
        message: "Please enter "+name
    })} type={type} id={id} placeholder={placeholder}/>;
}

export default Input;
