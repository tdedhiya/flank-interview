import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Link({
    to,
    href,
    text,
    children,
    button,
    action,
    white,
    plain,
    bold,
    block,
    dark,
    naked,
    onClick,
    buttonClass,
    icon,
    external,
    active,
    pageTab,
    pageTabChild,
    ...props
}) {
    const classes = ['flank-link', props.className || ''].filter(Boolean);
    if (button) {
        classes.push('button');
    }
    if (action) {
        classes.push('action');
    }
    if (white) {
        classes.push('white');
    }
    if (plain) {
        classes.push('plain');
    }
    if (bold) {
        classes.push('bold');
    }
    if (block) {
        classes.push('block');
    }
    if (dark) {
        classes.push('dark');
    }
    if (naked) {
        classes.push('naked');
    }
    if (buttonClass) {
        classes.push('flank-button');
    }
    if (active) {
        classes.push('active');
    }
    if (icon && !text && !children) {
        classes.push('icon-only');
    }
    if (pageTab) {
        classes.push('page-tab', 'bold');
    }
    if (pageTabChild) {
        classes.push('page-tab', 'page-tab-child', 'bold');
    }

    if (to) {
        props.to = to;
    } else if (href) {
        props.to = href;
    } else {
        props.to = '#';
    }

    if (onClick) {
        props.onClick = onClick;
    }

    if (!external) {
        return (
            <a {...props} className={classes.join(' ')}>
                {icon && <span className="icon">{icon}</span>}
                {text || children}
            </a>
        );
    } else {
        return (
            <a {...props} className={classes.join(' ')} href={props.to}>
                {icon && <span className="icon">{icon}</span>}
                {text || children}
            </a>
        );
    }
}

Link.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.node,
    button: PropTypes.bool,
    action: PropTypes.bool,
    white: PropTypes.bool,
    plain: PropTypes.bool,
    bold: PropTypes.bool,
    block: PropTypes.bool,
    dark: PropTypes.bool,
    naked: PropTypes.bool,
    onClick: PropTypes.func,
    buttonClass: PropTypes.string,
    icon: PropTypes.node,
    external: PropTypes.bool,
    active: PropTypes.bool,
    pageTab: PropTypes.bool,
    pageTabChild: PropTypes.bool,
    className: PropTypes.string,
};
