'use client';
import React, { useEffect, useState } from "react";
import { Toast as BootstrapToast, ToastContainer } from "react-bootstrap";
import { Icon } from "../..";
import classNames from "classnames";
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  show: boolean;
  animation?: boolean;
  //position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; // import from "react-bootstrap directly 
}

const ToastMessage: React.FC<ToastProps> = ({
  animation = true,
  message,
  type = "error",
  duration = 3000,
  show,

  // position = "middle-center"
}) => {
  const [isVisible, setIsVisible] = useState(show);

  // Determine icon properties based on type
  let iconName = "";
  let iconColor = "";
  let iconStyle = "";
  let className = ""; // Background color will be set here

  switch (type) {
    case "success":
      iconName = "Check";
      iconColor = "#FFF";
      className = "success-100 border-success-900";
      iconStyle = " toast-success-background "
      break;
    case "error":
      iconName = "X";
      iconColor = "#FFF";
      className = "danger-500  border-danger-900";
      iconStyle = " toast-error-background "
      break;
    case "info":
      iconName = "Info";
      iconColor = "#FFF";
      className = "gray-500 border-info-900";
      iconStyle = " toast-info-background "
      break;
    case "warning":
      iconName = "Exclamation";
      iconColor = "#FFF";
      className = "warning-500 border-warning-900";
      iconStyle = " toast-warning-background "
      break;
    default:
      iconName = "Info";
      iconColor = "#FFF";
      className = "gray-500 border-info-900";
      iconStyle = " toast-info-background "
      break;
  }

  // Ensure visibility state is controlled by `show` prop
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false); // Close the toast after duration
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false); // Ensure toast hides when `show` is false
    }
  }, [show, duration]);

  return (
    //position from reactbootstrap
    <ToastContainer position="top-end" className={classNames(
      "rounded mb-0 d-flex ",
      "me-5 mt-5"
    )}>
      <BootstrapToast
        animation={animation}
        show={isVisible} // Controlled by internal state 
        delay={duration}
        autohide onClose={() => setIsVisible(false)} // Local close handler 
        bg={className} // Apply the gradient background class 
      // className="border border-1"
      >
        <BootstrapToast.Header className=" d-flex justify-content-between border-0 mb-0 rounded align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className={classNames(iconStyle, "rounded border d-flex justify-content-center align-items-center")} style={{ width: "24px", height: "24px" }}>
              <Icon type="bootstrap" name={iconName} color={iconColor} size="23" />
            </div>
            <div className=" d-flex flex-column align-items-top  ms-3">
              <strong> {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize type */}
              </strong>
              <span className="p-sm">{message}</span>
            </div>
          </div>
        </BootstrapToast.Header>

        {/* <BootstrapToast.Body className= " rounded mb-0" style={className}>
          <span className="p-sm">{message}</span>
        </BootstrapToast.Body>
           */}
      </BootstrapToast >
    </ToastContainer >
  );
};

export default ToastMessage;

