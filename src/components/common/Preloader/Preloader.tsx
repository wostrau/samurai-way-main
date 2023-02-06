import React from 'react';
import loading from '../../../assets/loader.gif';

export const Preloader = () => {
    return (
        <div>
            <img src={loading} alt="loading"/>
        </div>
    );
};