import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { startLogin, startRegister } from '../../actions/auth';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [isLoginIn, setIsLoginIn] = useState( true );
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        loginEmail: '',
        loginPassword: ''
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerPasswordConfirm: ''
    });

    const {loginEmail, loginPassword } = formLoginValues;

    const { registerName, registerEmail, registerPassword, registerPasswordConfirm } = formRegisterValues;

    const handleClickChange = () => {
        setIsLoginIn( !isLoginIn );  
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(loginEmail, loginPassword));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if ( registerPassword !== registerPasswordConfirm ){
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
        }
        else {
            dispatch(startRegister( registerName, registerEmail, registerPassword ));
        }
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className={`col-md-6 login-form-1 mx-auto ${ !isLoginIn && 'd-none' }`}>
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
                <div className={ `col-md-6 login-form-2 mx-auto ${ isLoginIn && 'd-none' }` }>
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPasswordConfirm"
                                value={ registerPasswordConfirm }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
            <button
                className={ `btn ${ isLoginIn ? 'btn-primary' : 'btn-outline-primary' } btn-block mt-2 mx-auto w-25` }
                onClick={ handleClickChange }
            >
                { (isLoginIn) ? "Register" : "Login" }
            </button>
        </div>
    )
}