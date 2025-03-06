import React from 'react';
import Avatar from './Avatar'; // Adjust the path if necessary
import { AvatarSizes } from './Avatar';
import { Circle } from 'react-bootstrap-icons';
//import Flipcard1 from './images/Flipcard1.jpeg'; // Make sure this path and name are correct

export default {
    title: 'Atoms/Avatar',
    component: Avatar,
    argTypes: {
        size: {
            control: 'select',
            options: AvatarSizes,
        },
        src: { control: 'text' },
        alt: { control: 'text' },
    },
};

const AllSizesTemplate = (args) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>
                We can upload images from <b style={{ color: 'blue' }}>local source file image path</b> and <b style={{ color: 'blue' }}>URL</b> of the image.
                <br />
                The person icon was the default icon; by passing the URL or file path, it will disappear.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar size="xl" circle alt="Extra Large Avatar" />
                <Avatar size="lg" alt="Large Avatar" />
                <Avatar size="md" alt="Medium Avatar" />
                <Avatar size="sm" alt="Small Avatar" />
            </div>
        </div>
    );
};

export const AllSizes = AllSizesTemplate.bind({});
AllSizes.args = {
    src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Pass the imported image directly
    alt: 'User Avatar',
    // iconName: 'PersonCircle', // Default icon to display
};


// Default Avatar 
// Keep this variant available in all components for testing the variations in storybook
const Template = (args) => <Avatar {...args} />;

export const DefaultAvatar = Template.bind({});
DefaultAvatar.args = {
    size: 'lg',
    src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Pass the imported image directly
    alt: 'User Avatar',    
    circle: true,
};