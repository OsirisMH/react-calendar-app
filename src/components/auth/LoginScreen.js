import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { startLogin } from '../../actions/auth';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [isLoginIn, setIsLoginIn] = useState( true );
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        loginEmail: 'oamh09@gmail.com',
        loginPassword: 'Ganyu00'
    });

    const {loginEmail, loginPassword } = formLoginValues;

    const handleClickChange = () => {
        setIsLoginIn( !isLoginIn );  
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(loginEmail, loginPassword));
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
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
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