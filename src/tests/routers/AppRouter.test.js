import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { AppRouter } from "../../routers/AppRouter";

import * as authModule from '../../actions/auth';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe('Pruebas en <AppRouter />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrar el loading...', () => {
        const initState = { auth: { checking: true } };
        const store = mockStore( initState );
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de mostrar la ruta pública', () => {
        const initState = { auth: { checking: false, uid: null } };
        const store = mockStore( initState );
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.login-container').exists() ).toBe( true );
    });

    test('Debe de mostrar la ruta privada', () => {
        const initState = { ui: { modalOpen: false }, calendar: { events: [] } ,auth: { checking: false, uid: '123', name: 'test' } };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.calendar-screen').exists() ).toBe( true );
    });

    test('Debe llamarse startChecking', async () => {
        authModule.startChecking = jest.fn();
        
        const initState = { auth: {checking: true} };
        const store = mockStore( initState );
        store.dispatch = jest.fn();

        mount( 
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( authModule.startChecking ).toHaveBeenCalled();
    })
    
});
