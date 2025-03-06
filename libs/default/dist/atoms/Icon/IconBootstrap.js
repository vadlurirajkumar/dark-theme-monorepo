import * as Icons from "react-bootstrap-icons";
import PropTypes from "prop-types";

const BootstrapIcon = ({ name="Search", size, color, className}) => {
    BootstrapIcon.propTypes = {
        name: PropTypes.string.isRequired, // Icon name is required
        size: PropTypes.number,                // Optional size prop
        color: PropTypes.string,               // Optional color prop
        className: PropTypes.string,           // Optional className for styling
    };
    const IconComponent = Icons[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in react-bootstrap-icons`);
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

export default BootstrapIcon;
