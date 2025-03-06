
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Uploadimage.stories.scss'; // Import your SCSS/CSS file
import * as Icons from "react-bootstrap-icons";


export const AvatarSizes = {
    lg: "lg",
    md: "md",
    sm: "sm",
};


const Uploadimage = ({
    src,
    alt,
    size,
    iconName }) => {

    Uploadimage.propTypes = {
        // URL of the image   & local source file of image path
        src: PropTypes.string,
        // Alternative text for the image
        alt: PropTypes.string,
        // Size of the Uploadimage
        size: PropTypes.oneOf(AvatarSizes),
        // Name of the Bootstrap icon to display when no image is present
        iconName: PropTypes.string,
    };


    const [imageSrc, setImageSrc] = useState(src);      // Set initial image source to provided src or empty string

    useEffect(() => {                                   // Handle initial src prop changes
        if (src) {
            setImageSrc(src);
        }
    }, [src]);

    // Handle the image upload and set the uploaded image as the new Uploadimage

    const handleImageUpload = (event) => {
        const file = event.target.files[0];             // Get the uploaded file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);             // Set the uploaded image as the Uploadimage image
            };
            reader.readAsDataURL(file);                 // Read the uploaded file as a Data URL
        }
    };

    const IconComponent = Icons[iconName] || Icons['PersonCircle'];
    //select the icon from react-bootstrap-icons && Fallback to 'PersonCircle' if no icon name is provided
    return (
        <div className={`Uploadimage ${size}`}>
            {imageSrc ? (                                   // If imageSrc exists, display the image
                <img src={imageSrc} alt={alt} className="Upload-image" />
            ) : (                                           // Otherwise, display the default icon
                <div className="default-icon">
                    {IconComponent && (
                        <IconComponent size={size === 'lg' ? '48' : size === 'md' ? '32' : '16'} />
                    )}
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload} // Trigger image upload when file is selected
                id="file-upload"
                style={{ display: 'none' }} // Hide the actual file input
            />
            <label htmlFor="file-upload" className="upload-label" />
        </div>
    );
};

export default Uploadimage;
