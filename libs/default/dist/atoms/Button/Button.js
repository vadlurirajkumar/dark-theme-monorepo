"use client";
import classNames from "classnames";
import { Button as Btn, Spinner } from "react-bootstrap";
import Icon from "../Icon/Icon";


const Button = ({
  variant = "primary",
  size = "lg",
  type = "button",
  text = "",
  className = "",
  rounded = false,
  iconType = "", // Default to 'bootstrap' icons
  iconPosition = "right", // 'left' or 'right'
  iconName = "", // String to select which icon to render
  iconOnly = false,
  iconColor = "white",
  onClick = () => { }, // Default to an empty function
  disabled = false,
  loading = false,
  block = false, // Makes the button full-width
  ...props
}) => {

  // refactoring icons size as per button size
  var icSize = ""
  if (size === "lg") {
    icSize = "20"
  }
  if (size === "md") {
    icSize = "16"
  }
  if (size === "sm") {
    icSize = "16"
  }
  if (size === "xs") {
    icSize = "12"
  }


  // Function to render the icon
  const renderIcon = () => {
    const iconClass = iconOnly
      ? ""
      : iconPosition === "right"
        ? "ms-3" // Bootstrap class for left margin
        : "me-2"; // Bootstrap class for right margin

    return (
      <Icon
        type={iconType}
        name={iconName}  // Dynamically use the passed icon name
        size={icSize}
        color={iconColor}
        className={iconClass}
      />
    );
  };

  return (
    <Btn
      variant={variant}
      size={size}
      type={type}
      className={classNames(
        `${className}`,
        `${block ? "w-100" : ""}`,
        `${iconOnly ? "icon-only" : "button-with-icon"}`,
        `${rounded ? "rounded-pill" : ""}`
      )
        //   `${className} ${block ? "w-100" : ""} ${
        //   iconOnly ? "icon-only" : "button-with-icon"
        // } ${rounded ? "rounded-pill" : ""}`
      }
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        // "Loading..." // Display loading text while loading
        // { children } || { text }
        <>
          {text}    {/* The text message can be modified when loading from the parent */}
          <Spinner variant="light" size="sm"></Spinner>
        </>
      ) : (
        <>
          {!iconOnly && iconPosition === "left" && renderIcon()}
          {!iconOnly && text}
          {!iconOnly && iconPosition === "right" && renderIcon()}
          {iconOnly && renderIcon()}
        </>
      )}
    </Btn>
  );
};

export default Button;
