import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Link from '../Link/index';
import { IoChevronDown, IoEllipsisVertical } from 'react-icons/io5';

function Action({ action, data, setIsOpen }) {
    if (!action.type || action.type === 'button') {
        const handleOnClick = () => {
            if (action.onClick) {
                action.onClick(data);
                setIsOpen(false);
            }
        };
        return (
            <button type="button" onClick={handleOnClick} className="action">
                {action.icon}
                {action.label}
            </button>
        );
    } else if (action.type === 'link') {
        return (
            <Link to={action.to} className="action">
                {action.icon}
                {action.label}
            </Link>
        );
    }
}

export default function Popover({ openLeft, actions, data, label, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [popoverClasses, setPopoverClasses] = useState(['flank-popover-content']);
    const menuRef = useRef(null);
    const popoverRef = useRef(null);

    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOut = (event) => {
        if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const getScrollableParents = useCallback((element, _array) => {
        if (_array === undefined) {
            _array = [];
        }
        if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
            _array.push(element);
        }

        if (element.tagName !== 'BODY') {
            return getScrollableParents(element.parentNode, _array);
        } else {
            return _array;
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOut, false);
        const scrollableParents = getScrollableParents(menuRef.current);
        window.addEventListener('scroll', handleClickOut, false);
        window.addEventListener('resize', handleClickOut, false);
        for (let i = 0; i < scrollableParents.length; i++) {
            scrollableParents[i].addEventListener('scroll', handleClickOut, false);
        }

        return () => {
            document.removeEventListener('click', handleClickOut, false);
            window.removeEventListener('scroll', handleClickOut, false);
            window.removeEventListener('resize', handleClickOut, false);
            for (let i = 0; i < scrollableParents.length; i++) {
                scrollableParents[i].removeEventListener('scroll', handleClickOut, false);
            }
        };
    }, [getScrollableParents]);

    useEffect(() => {
        if (!isOpen) {
            setPopoverClasses((p) => [...p].filter((c) => c !== 'open'));
        }

        if (isOpen && popoverRef.current) {
            const buttonBounds = menuRef.current.getBoundingClientRect();
            const menuBounds = popoverRef.current.getBoundingClientRect();

            let top = buttonBounds.top + buttonBounds.height;
            let left = buttonBounds.left;

            if (openLeft) {
                left = buttonBounds.left - menuBounds.width + buttonBounds.width;
                if (left < 0) {
                    left = 0;
                }
            } else {
                if (left + menuBounds.width > window.innerWidth) {
                    left = window.innerWidth - menuBounds.width;
                }
            }

            if (top + menuBounds.height > window.innerHeight) {
                top = buttonBounds.top - menuBounds.height;
            }

            setPosition({
                top: top,
                left: left,
            });
            setPopoverClasses((p) => [...p, 'open']);
        }
    }, [isOpen, popoverRef, openLeft]);

    const classes = ['flank-popover'];

    return (
        <div ref={menuRef} className={classes.join(' ')} {...rest}>
            <button type="button" className="button" onClick={togglePopover}>
                {label ? (
                    <>
                        {label} <IoChevronDown />
                    </>
                ) : (
                    <IoEllipsisVertical />
                )}
            </button>
            {isOpen && (
                <div className={popoverClasses.join(' ')} ref={popoverRef} style={position}>
                    {actions.map((action, index) => (
                        <Action key={index} action={action} data={data} setIsOpen={setIsOpen} />
                    ))}
                </div>
            )}
        </div>
    );
}

Action.propTypes = {
    action: PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.element,
        onClick: PropTypes.func,
        to: PropTypes.string,
    }).isRequired,
    data: PropTypes.object,
    setIsOpen: PropTypes.func.isRequired,
};

Popover.propTypes = {
    openLeft: PropTypes.bool,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            label: PropTypes.string,
            icon: PropTypes.element,
            onClick: PropTypes.func,
            to: PropTypes.string,
        })
    ).isRequired,
    data: PropTypes.object,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]),
};
