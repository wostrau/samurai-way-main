import React from 'react'
import loading from '../../../assets/loader.gif'

export const Preloader: React.FC = () => {
    return (
        <div>
            <img src={loading} alt="loading"/>
        </div>
    )
}