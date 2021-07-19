import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe('Pruebas en el helper Fetch', () => {
    let token = '';

    test('Debe funcionar fetchSinToken', async() => {
        const resp = await fetchSinToken('auth', {email: 'azrho07@gmail.com', password: '123456'}, 'POST');
        const body = await resp.json();

        expect( resp instanceof Response).toBe( true );
        expect( body.ok ).toBe( true );

        token = body.token;
    });
    
    test('Debe funcionar fetchConToken', async() => {
        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/60ed7851701fc6391eb5b321', {}, 'DELETE');
        const body = await resp.json();

        expect( body.msg ).toBe('No se encontró ningun evento con ese id');
    });
    
});
