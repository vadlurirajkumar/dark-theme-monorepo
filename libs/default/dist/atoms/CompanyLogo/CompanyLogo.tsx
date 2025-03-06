import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Define available sizes
export const CompanylogoSizes = {
  xl: "xl",
  lg: "lg",
  md: "md",
  sm: "sm",
  xs: "xs",
  xxs: "xxs",
};

// Prop types for the Companylogo component
export const CompanylogoPropTypes = {
  // Size of the logo
  size: PropTypes.oneOf(Object.values(CompanylogoSizes)),

  // Image src (URL)
  src: PropTypes.string,

  // Display as a circle
  circle: PropTypes.bool,
  // Display borders
  border: PropTypes.bool,

  // Custom class for additional styling
  customClass: PropTypes.string,

  // Alt text for accessibility
  alt: PropTypes.string,

  // Width and height of the container
  width: PropTypes.string,

  height: PropTypes.string,

  // Size of the logo image
  imgSize: PropTypes.string,
};

const CompanyLogo = ({
  alt = "image",
  size = "md",
  src = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  customClass = "",
  circle = false,
  border = false,
  width = "64px",
  height = "64px",
  imgSize = "60px",
}) => {
  return (
    <div
      className={classNames(
        "d-flex justify-content-center align-items-center bg-gray-50 ",
        { "border border-1 border-gray-200": border },
        { "rounded-circle": circle }
      )}
      style={{ width, height }}
    >
      <img
        src={src}
        alt={alt}
        className={classNames(
          { "rounded-circle": circle },
          "c-logo",
          `c-logo-${size} border border-0`,
          customClass // Applying the custom class if provided
        )}
        style={{ width: imgSize, height: imgSize }} // Apply size to the image
      />
    </div>
  );
};

// Apply prop types to component
CompanyLogo.propTypes = CompanylogoPropTypes;

export default CompanyLogo;
