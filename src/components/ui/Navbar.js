import React from 'react';

export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                Orale we
            </span>

            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt pr-2"></i>
                <span>Salir</span>
            </button>
        </div>
    )
};
