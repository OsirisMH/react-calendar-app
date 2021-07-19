import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from "../../../actions/events";

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn(),
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
);

describe('Pruebas en <DeleteEventFab />', () => {
    
    test('Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de llamar el eventStartDelete al hacer clic', () => {
        wrapper.find('button').prop('onClick')();
        expect( eventStartDelete ).toHaveBeenCalled();
    });
    
});
