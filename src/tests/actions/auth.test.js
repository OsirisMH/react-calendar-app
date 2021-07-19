import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { startChecking, startLogin, startLogout, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );
const initState = {};

let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones auth', () => {
    beforeEach( () => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });    
    
    test('Debe funcionar startLogin', async() => {
        await store.dispatch( startLogin('azrho07@gmail.com', '123456') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // token = localStorage.setItem.mock.calls[0][1];
        // console.log(localStorage.setItem.mock.calls[0][1]);
    });
    
    test('StarLogin incorrecto', async() => {
        await store.dispatch( startLogin('azrho07@gmail.com', 's123456') );
        let actions = store.getActions();        

        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Usuario y/o contrseña incorrectos', 'error');

        await store.dispatch( startLogin('azrho0s7@gmail.com', '123456') );
        actions = store.getActions(); 

        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Usuario y/o contrseña incorrectos', 'error');
    });

    test('Debe funcionar correctamente StartRegister', async() => {
        fetchModule.fetchSinToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '0001',
                    name: 'testing',
                    token: 'absf034nbksds213_'
                }
            }
        }));

        await store.dispatch(startRegister('test', 'test@testing.com', 'testing'));
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '0001',
                name: 'testing'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'absf034nbksds213_');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })
    
    test('startCheking debe funcionar correctamente', async() => {
        
        fetchModule.fetchConToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '0001',
                    name: 'testing',
                    token: 'absf034nbksds213_'
                }
            }
        }));

        await store.dispatch( startChecking() );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '0001',
                name: 'testing'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'absf034nbksds213_');
    });
    
    test('Debe funcionar startLogout correctamente', async() => {
        Storage.prototype.clear = jest.fn();
        await store.dispatch( startLogout() );
        const actions = store.getActions();
        
        expect( localStorage.clear ).toHaveBeenCalled();
        expect( actions[0] ).toEqual({ type: types.eventClear });
        expect( actions[1] ).toEqual({ type: types.authLogout });
    });
    
});
