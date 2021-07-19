import { mount } from "enzyme";
import { Provider } from "react-redux";
import Swal from 'sweetalert2';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen />
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test('Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot(); 
    });
    
    test('Debe de llamar el dispatch del login', () => {
        wrapper.find('input[name="loginEmail"]').simulate('change', {
            target: {
                name: 'loginEmail',
                value: 'Testing name'
            }
        });
        wrapper.find('input[name="loginPassword"]').simulate('change', {
            target: {
                name: 'loginPassword',
                value: 'password'
            }
        });
        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startLogin ).toHaveBeenCalledWith('Testing name', 'password');
    });
    
    test('No hay registro si las contraseñas son diferentes', () => {
        wrapper.find('input[name="registerName"]').simulate('change', {
            target: {
                name: 'registerName',
                value: 'Test'
            }
        });
        wrapper.find('input[name="registerEmail"]').simulate('change', {
            target: {
                name: 'registerEmail',
                value: 'test@testing.com'
            }
        });
        wrapper.find('input[name="registerPassword"]').simulate('change', {
            target: {
                name: 'registerPassword',
                value: 'password'
            }
        });
        wrapper.find('input[name="registerPasswordConfirm"]').simulate('change', {
            target: {
                name: 'registerPasswordConfirm',
                value: 'fakepassword'
            }
        });
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startRegister ).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Las contraseñas deben ser iguales', 'error');
    });
    
    test('Debe funcionar el registro con contraseñas iguales', () => {
        wrapper.find('input[name="registerPassword"]').simulate('change', {
            target: {
                name: 'registerPassword',
                value: 'password'
            }
        });
        wrapper.find('input[name="registerPasswordConfirm"]').simulate('change', {
            target: {
                name: 'registerPasswordConfirm',
                value: 'password'
            }
        });
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startRegister ).toHaveBeenCalledWith("Test", "test@testing.com", "password");
    })
    
});
