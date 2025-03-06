// "use client";
import PropTypes, { any } from "prop-types";
import classNames from "classnames";


export const AvatarSizes = {
    xl: "xl",
    lg: "lg",
    md: "md",
    sm: "sm",
    xs: "xs",
    xxs: "xxs"
};

export const AvatarPropTypes = {
    // Optional: Button size
    variant: PropTypes.oneOf(Object.values(AvatarSizes)),

    // Image src. http url
    src: PropTypes.string,

    circle: PropTypes.bool,
    // Custom properties
    className: PropTypes.string,

    // Alt text for image
    alt: PropTypes.string,

    // Optional: Show status indicator
    showStatus: PropTypes.bool,
    
    // Optional: Show online status indicator
    isOnline: PropTypes.bool,
    isOffline: PropTypes.bool,
    isAway: PropTypes.bool,


};

const Avatar = ({
    alt = "image",
    size = "md",
    src = "/static/images/default-avatar.avif",
    customClass = "",
    circle = false,
    isOnline = false,
    isOffline = false,
    isAway = false,
    showStatus = false
}) => {
    return (
        <div id="Avatar" className={`position-relative ${customClass}`}>
            <img
                src={src}
                alt={alt}
                className={classNames(
                    "img-fluid",
                    { "rounded-circle": circle },
                    "avatar",
                    `avatar-${size}`
                )}
            />
            {showStatus && (
                <span
                    className={classNames(
                        "position-absolute top-0 end-0 translate-middle rounded-circle",
                        { "bg-success-600":  isOnline},
                        { "bg-warning-600": isAway},
                        { "bg-gray-300": isOffline},
                    )
                        
                    }
                    style={{
                        width: '12px',
                        height: '12px',
                        border: '2px solid #fff',
                    }}
                ></span>
            )}
        </div>
    );
};


export default Avatar;
