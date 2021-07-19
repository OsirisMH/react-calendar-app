import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

if ( process.env.NODE_ENV !== 'test' )
    Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
};

export const CalendarModal = () => {
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    

    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState( now.toDate() );
    const [, setEndDate] = useState( nowPlus1.toDate() );
    const [formValues, setFormValues] = useState( initEvent );
    const [isTitleValid, setIsTitleValid] = useState( true );

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        }
        else {
            setFormValues( initEvent );
        }
    }, [activeEvent, setFormValues]);

    const closeModal = () => {
        //TODO: cerrar el modal
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initEvent );
        setStartDate( now.toDate() );
        setEndDate( nowPlus1.toDate() );
    };

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
        }

        if ( title.trim().length < 1 ){
            return setIsTitleValid( false );
        }

        //TODO: realizar grabación en base de datos
        if ( activeEvent ) {
            dispatch( eventStartUpdate(formValues) );
        }
        else {
            dispatch( eventStartAddNew(formValues) );
        }

        setIsTitleValid( true );
        closeModal();
    };

    const handleStartDateChange = (e) => {
        setStartDate( e );
        setFormValues({ ...formValues, start: e });
    };

    const handleEndDateChange = (e) => {
        setEndDate( e );
        setFormValues({ ...formValues, end: e });
    };
    
    return (
        <Modal
            isOpen={ modalOpen }
            // onAfterOpen={afterOpenModal}
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
            ariaHideApp={ !process.env.NODE_ENV === 'test' }
        >
            <h1> { (activeEvent) ? 'Editar evento' : 'Nuevo evento' } </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ start }
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ end }
                        minDate={ startDate }
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !isTitleValid && 'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
};
