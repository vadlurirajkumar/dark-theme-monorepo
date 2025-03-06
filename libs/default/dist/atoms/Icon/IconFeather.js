import * as FeatherIcons from "feather-icons-react";
import PropTypes from "prop-types";

const FeatherIcon = ({ name="Search", size, color="black", className}) => {
    FeatherIcon.propTypes = {
        name: PropTypes.string.isRequired, // Icon name is required
        size: PropTypes.number,                // Optional size prop
        color: PropTypes.string,               // Optional color prop
        className: PropTypes.string,           // Optional className for styling
    };
    const IconComponent = FeatherIcons[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in feather-icons-react`);
        return null;
    }
    return (
        <IconComponent
            size={size}
            color={color}
            className={className}
        />
    );
};

export default FeatherIcon;
