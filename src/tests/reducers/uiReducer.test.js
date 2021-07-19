import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initState = {
    modalOpen: false
};

describe('Pruebas en uiReducer', () => {
    
    test('Debe retornar el estado por defecto', () => {
        const state = uiReducer( initState, {} );  
        expect( state ).toEqual( initState );
    })

    test('Debe de abrir y cerrar el modal', () => {
        const modalOpen = uiOpenModal();
        let state = uiReducer( initState, modalOpen );
        expect( state ).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        state = uiReducer( state, modalClose );
        expect( state ).toEqual({ modalOpen: false });
    });
    
});
