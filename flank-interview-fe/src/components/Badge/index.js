import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Badge({ label, icon, iconLast, selected, onClick, bigBox, className, ...rest }) {
    const classes = ['badge-container', className || ''];

    if (selected) {
        classes.push('selected');
    }

    if (bigBox) {
        classes.push('bigbox');
    }
    if (iconLast) {
        classes.push('icon-last');
    }

    if (!icon) {
        classes.push('no-icon');
    }

    return (
        <div className={classes.filter(Boolean).join(' ')} onClick={onClick} {...rest}>
            {icon && <div className="icon">{icon}</div>}
            <span className={icon && iconLast ? 'text-first' : icon ? 'text-last' : ''}>{label}</span>
        </div>
    );
}

Badge.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.node,
    iconLast: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    bigBox: PropTypes.bool,
    className: PropTypes.string,
};
