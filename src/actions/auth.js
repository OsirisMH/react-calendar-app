import Swal from "sweetalert2";
import { NotificationManager } from 'react-notifications';

import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { eventsClear } from "./events";
import { types } from "../types/types";

export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
            const body = await resp.json();
            
            if ( body.ok ) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem('token-init-date', new Date().getTime() );
                
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }));
            }
            else {
                Swal.fire('Error', body.msg, 'error');
            }
        }
        catch {

        }
    }
};

export const startRegister = ( name, email, password ) => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchSinToken( 'auth/new', { name, email, password }, 'POST' );
            const body = await resp.json();
            
            if ( body.ok ) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem('token-init-date', new Date().getTime() );
                
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }));
            }
            else {
                Swal.fire('Error', body.msg, 'error');
            }
        }
        catch(error) {
            console.log(error);
        }
    }
};

export const startChecking = () => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchConToken( 'auth/renew' );
            const body = await resp.json();
            
            if ( body.ok ) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem('token-init-date', new Date().getTime() );
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }));
            }
            else {
                dispatch( checkingFinish() );
                if ( body.msg === 'Token no válido'){
                    NotificationManager.error( 'Session expired', 'Error' );
                }
            }
        }
        catch {
            dispatch( checkingFinish() );
        }
    }
};

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( eventsClear() );
        dispatch( logout() );
    };
};

const logout = () => ({ type: types.authLogout });