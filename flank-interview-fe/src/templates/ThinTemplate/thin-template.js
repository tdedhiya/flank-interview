import React from 'react';
import PropTypes from 'prop-types';
import './thin-template.scss';
import { ReactSVG } from 'react-svg';

export default function ThinTemplate({ instructionTitle, children }) {
    return (
        <div className="flank-thin-template">
            <ReactSVG src="../../../assets/images/logo.svg" className="logo" />
            
            <span className="instruction">{instructionTitle}</span>

            {children}
        </div>
    );
}

ThinTemplate.propTypes = {
    instructionTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
