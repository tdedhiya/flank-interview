import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Popover from './';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';

export default {
    title: 'FLANK/Atoms/Popover',
    component: Popover,
};

const Template = (args) => (
    <Router>
        its.... ~evasive~ <Popover {...args} />
    </Router>
);

export const Default = Template.bind({});
Default.args = {
    openLeft: false,
    actions: [
        {
            type: 'link',
            icon: <IoPencilOutline />,
            label: 'Action 1',
            to: '#',
        },
        {
            icon: <IoTrashOutline />,
            label: 'Action 2',
            onClick: () => {
                console.log('Action clicked');
            },
        },
        {
            label: 'Action 2',
            onClick: () => {
                console.log('Action clicked');
            },
        },
    ],
};
