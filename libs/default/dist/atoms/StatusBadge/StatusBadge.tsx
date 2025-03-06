'use client'
import React, { useState } from "react";
import classNames from "classnames";
import { Icon } from "../.."; // Importing the Icon component
import CloseButton from 'react-bootstrap/CloseButton';

interface CustomBadgeProps {
  text: string;
  status: "closed" | "expired" | "new" | "nopending";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light" | string;
  buttonVariant?: "link" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | "outline-dark" | "outline-light" | string;
  className?: string;
  size?: "lg" | "md" | "sm" | "xs";
  iconType?: "bootstrap" | "feather"; // Added prop for icon type
  iconName?: string; // Name of the icon
  onClose?: () => void; // Optional function to handle closing externally
  type?: "default" | "fill" | "outline"; // Added prop for type
}



const CustomBadge: React.FC<CustomBadgeProps> = ({
  text,
  status,
  variant,
  buttonVariant,
  className = "",
  size = "sm", // Default to "sm" size
  iconType,
  iconName,
  onClose,
  type = "default", // Default to "default" type
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Determine the variant based on status if not provided
  let Variant = variant;
  let ButtonVariant = buttonVariant;

  if (!Variant) {
    switch (status.toLowerCase()) {
      case "closed":
        Variant = "success";
        break;
      case "expired":
        Variant = "danger";
        break;
      case "new":
        Variant = "primary";
        break;
      case "nopending":
        Variant = "secondary";
        break;
      default:
        Variant = "light";
    }
  }

  if (type === "outline" && !ButtonVariant) {
    switch (status.toLowerCase()) {
      case "closed":
        ButtonVariant = "outline-success";
        break;
      case "expired":
        ButtonVariant = "outline-danger";
        break;
      case "new":
        ButtonVariant = "outline-primary";
        break;
      case "nopending":
        ButtonVariant = "outline-secondary";
        break;
      default:
        ButtonVariant = "outline-light";
    }
  }



  /**
   * 
   * @param @sizeClass // based on size lg  the size of badge size are displayed
   * @param @textClass // based onsize lg,md,sm and xs the text size is displayed
   * 
   */


  const sizeClass =
    size === "lg" ? "badge-lg" :
      size === "sm" ? "badge-sm" :
        size === "md" ? "badge-md" :
          size === "xs" ? "badge-xs" : "";

  const textClass =
    size === "lg" ? "text-large" :
      size === "sm" ? "text-small" :
        size === "md" ? "text-medium" :
          size === "xs" ? "text-extra-small" : "";

  const icSize = size === "lg" ? "20" : size === "md" || size === "sm" ? "16" : "12";

  const badgeClass = classNames(
    "badge",
    `rounded-pill`,
    sizeClass,
    textClass,
    {
      [`btn ${ButtonVariant}`]: type === "outline",
      [`bg-${Variant}`]: type === "fill",
      [`text-${Variant}`]: type === "default",
    },
    className
  );

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  const iconColor = buttonVariant?.startsWith("outline-")
    ? buttonVariant.replace("outline-", "") // Extract the variant color
    : "white";

  const closeButtonSizeClass =
    size === "lg" ? "btn-lg" :
      size === "sm" ? "btn-sm" :
        size === "md" ? "btn-md" :
          size === "xs" ? "btn-xs" : "";

  return (
    <div className={`d-flex align-items-center ${className} ${sizeClass}`}>
      <div className={badgeClass}>
        {/* {iconName && (
          <Icon
            type={iconType}
            name={iconName}
            size={icSize}
            color="currentColor" // Adjust icon color dynamically
            className="me-2"
          />
        )} */}
        {text}
        <CloseButton
          onClick={handleClose}
          className={classNames("rounded-0 ms-2 p-0", closeButtonSizeClass)}
        />
      </div>
    </div>
  );
};


export default CustomBadge;
