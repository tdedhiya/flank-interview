import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

import './style.scss';

export default function HorizontalScrollable({ children }) {
    const contentRef = useRef();
    const [contentScrollPerc, setContentScrollPerc] = useState(0);
    const [hasScrollableContent, setHasScrollableContent] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = contentRef.current;
            const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setContentScrollPerc(scrollPercentage);
            setHasScrollableContent(scrollWidth > clientWidth);
        };

        const content = contentRef.current;
        if (content) {
            content.addEventListener('scroll', handleScroll);
            setHasScrollableContent(content.scrollWidth > content.clientWidth);
        }

        return () => {
            if (content) {
                content.removeEventListener('scroll', handleScroll);
            }
        };
    }, [contentRef]);

    const handleScrollClick = (ref, isRight) => {
        const newPosition = ref.current.scrollLeft + (isRight ? 300 : -300);
        ref.current.scroll({
            left: newPosition,
            behavior: 'smooth',
        });
    };

    return (
        <div className="badge-carousel">
            <button
                className="carousel-btn carousel-btn-left"
                onClick={() => handleScrollClick(contentRef, false)}
                hidden={contentScrollPerc < 1 || !hasScrollableContent}
            >
                <ReactSVG src="../../../assets/images/icons/navigation-icons/carousel-nav/left-btn.svg" />
            </button>
            <div className="badge-carousel-content" ref={contentRef}>
                {children}
            </div>
            <button
                className="carousel-btn carousel-btn-right"
                onClick={() => handleScrollClick(contentRef, true)}
                hidden={contentScrollPerc > 99 || !hasScrollableContent}
            >
                <ReactSVG src="../../../assets/images/icons/navigation-icons/carousel-nav/right-btn.svg" />
            </button>
        </div>
    );
}

HorizontalScrollable.propTypes = {
    children: PropTypes.node.isRequired,
};
