"use client";
import PropTypes, { any } from "prop-types";
import * as BootstrapIcons from "react-bootstrap-icons";

// export const IconVariants = {
//   primary: "primary",
//   secondary: "secondary",
//   success: "success",
//   warning: "warning"
// };

export const IconSizes = {
  lg: "24",
  md: "20",
  sm: "16",
  xs: "12",
};

export const IconPropTypes = {

  // Optional: Button size
  size: PropTypes.oneOf(Object.values(IconSizes)),

  // Color name of the icon. ex: blue, white, red, green, yellow
  color: PropTypes.string,

  // Customize bootstrap classes
  className: PropTypes.string,

};

const IconBootstrap = ({ iconName, size, color, className = "" }) => {
  const IconComponent = Icons[iconName];
 
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in react-bootstrap-icons`);
    return null;
  }
 
  return (
    <IconComponent
      size={size}
      color={color}
      className={className} // Apply classes passed from the parent component
    />
  );
};

IconBootstrap.propTypes = IconPropTypes;
export default IconBootstrap;


