import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initState = {
    checking: true
};

describe('Pruebas en authReducer', () => {
    
    test('Debe de retornar el estado por defecto', () => {
        const action = {};
        const state = authReducer( initState, action );
        expect( state ).toEqual( initState );
    });
     
    test('Debe autenticar al usuario [authLogin]', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: 'test',
                name: 'testing'
            }
        };
        const state = authReducer( initState, action );

        expect( state ).toEqual({
            checking: false,
            uid: 'test',
            name: 'testing'
        })
    });

    test('Debe realizar el logout [authLogout]', () => {
        const action = { type: types.authLogout };
        const state = authReducer( initState, action );

        expect( state ).toEqual({ checking: false })
    });

    test('Debe realizar el checkingFinish', () => {
        const action = { type: types.authCheckingFinish };
        const initState = { checking: true, uid: 'test', name: 'testing'}
        const state = authReducer( initState, action );

        expect( state ).toEqual({ ...initState, checking: false })
    });
});
