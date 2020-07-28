import React from 'react';
import './most-isolated.scss';

export default props => (
    <div className="mostIsolated">
        The most isolated country is <span>{props.country}</span> with isolated degree <span>{props.degree}</span>
    </div>
);