import React, { useState } from 'react';
import Uploadimage from './Uploadimage.js';  // Adjust the path to where your Uploadimage component is located

export default {
    title: 'Molecules/Uploadimage',
    component: Uploadimage,
    argTypes: {
        size: {
            control: 'select',
            options: ['lg', 'md', 'sm'],
        },
        src: { control: 'text' },
        alt: { control: 'text' },
        iconName: { control: 'text' }, // Control for icon name
    },
};

// Template for rendering Uploadimage of different sizes with image URL and file upload support
const AllSizesTemplate = (args) => {
    const [uploadedImageSrc, setUploadedImageSrc] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImageSrc(reader.result); // Set the uploaded image as the source
            };
            reader.readAsDataURL(file);
        }
    };

    // Use the provided URL from args if it exists, otherwise fallback to the uploaded image
    const imageSrc = args.src || uploadedImageSrc;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>We can upload Images from <b style={{color:'blue'}}> local Source file image path</b> and <b style={{color:'blue'}}>url </b> of image <br/> The person icon was default icon by passing url or filepath it will disappear </p> <br/>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Uploadimage {...args} size="lg" alt="Large Uploadimage" src={imageSrc} />
                <Uploadimage {...args} size="md" alt="Medium Uploadimage" src={imageSrc} />
                <Uploadimage {...args} size="sm" alt="Small Uploadimage" src={imageSrc} />
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginTop: '1rem' }}
            />
        </div>
    );
};

// Story to display Uploadimages of all sizes together with file upload and URL support
export const AllSizes = AllSizesTemplate.bind({});
AllSizes.args = {
    src: '', // Start without an image, allowing both URL input and upload
    alt: 'User Uploadimage',
    iconName: 'person', // Default icon to display
};
