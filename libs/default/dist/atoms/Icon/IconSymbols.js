import React from 'react';
import PropTypes from 'prop-types';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded'; // Import rounded variant (or `sharp`/`outlined` based on preference)

const CustomMaterialSymbol = ({
  icon,
  size,
  color,
  style,
  className,
  onClick,
  fill = false,
  grade = 0,
  weight = 400, // Default weight
  as = 'span', // Default HTML element
}) => {
  return (
    <MaterialSymbol
      icon={icon}
      size={parseInt(size)}
      color={color}
      className={className}
      onClick={onClick}
      fill={fill}
      grade={grade}
      weight={weight}
      as={as}
      style={style}
    />
  );
};

CustomMaterialSymbol.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object, // Optional style prop
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Can be number or string
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  fill: PropTypes.bool,
  grade: PropTypes.number,
  weight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]), // Enum for weight
  as: PropTypes.elementType, // HTML element type
};

export default CustomMaterialSymbol;




{/**
  @Icons  To apply hover to Icon then Apply CSS style do not add color prop in page 
 
   <span className="icon-hover">  demo to show to add hover to icon
            material
            <Icon
              type="material"  all type appled
              name="Folder"
              size="40px"
              //  color="red"
              fill={false}
              grade={50}
              weight='700'
            />
  </span>
          
.icon-hover {                    this is className="icon-hover you define what every you want to define
 color: slategrey;               here you can add color icon 

  :hover {                        
    color: rgb(215, 23, 23);    Now you can add color to icon on hover the icon color
  
}
  */}