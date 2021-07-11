import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import ReactLoading from 'react-loading';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { startChecking } from '../actions/auth';

import '../styles.css';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth)
    
    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);

    if ( checking ) {
        return (
            <div className="loadingContainer">
                <ReactLoading
                    type="spin"
                    color="#0062cc"
                    height={80}
                    width={80}
                    className="loading"
                />
                <h5>Loading...</h5>
            </div> 
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={ CalendarScreen }
                        isAuthenticated={ !!uid }
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
};
