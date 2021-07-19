import { mount } from "enzyme";
import { act } from "@testing-library/react";
import { Provider } from "react-redux";
import moment from 'moment';
import Swal from 'sweetalert2';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { CalendarModal } from "../../../components/calendar/CalendarModal";
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from "../../../actions/events";

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');
const initState = {
    calendar: {
        events: [],
        activeEvent: { title: 'Hola Mundo', notes: 'notas', start: now.toDate(), end: nowPlus1.toDate() }
    },
    auth: { uid: '000', name: 'test' },
    ui: { modalOpen: true }
};

const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
);

describe('Pruebas en <CalendarModal />', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('Debe de mostrar el modal', () => {
        // expect( wrapper.find('.modal').exists() ).toBe( true );
        expect( wrapper.find('Modal').prop('isOpen') ).toBe( true );
    });

    test('Debe de llamar la acción de actualizar y cerrar modal', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });
        expect( eventStartUpdate ).toHaveBeenCalledWith( initState.calendar.activeEvent );
        expect( eventClearActiveEvent ).toHaveBeenCalled();
    });
    
    test('Debe de mostrar error si falta el titulo', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });
        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe( true );
    });
    
    test('Debe de crear un nuevo evento', () => {
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: { uid: '000', name: 'test' },
            ui: { modalOpen: true }
        };
        
        const store = mockStore( initState );
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        );
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Testing'
            }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });
        expect( eventStartAddNew ).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Testing',
            notes: ''
        });
        expect( eventClearActiveEvent ).toHaveBeenCalled();
    });

    test('Debe de validar las fechas', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Testing'
            }
        });

        const hoy = new Date();
        
        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "La fecha fin debe ser mayor a la fecha de inicio", "error");
    });
});
