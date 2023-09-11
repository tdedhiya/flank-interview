import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from '..';

export default {
    title: 'FLANK/Atoms/Link',
    component: Link,
};

const Template = (args) => (
    <Router>
        <Link {...args} />
    </Router>
);

export const Default = Template.bind({});
Default.args = {
    to: '#',
    text: 'Example Link',
    button: false,
    white: false,
    plain: false,
    bold: false,
    block: false,
    dark: false,
    buttonClass: false,
};
