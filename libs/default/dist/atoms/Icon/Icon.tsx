"use client";
import React from 'react';
import BootstrapIcon from "./IconBootstrap";
import FeatherIcon from "./IconFeather";
import CustomMaterialSymbol from "./IconSymbols"; // Add import for CustomSocialIcon
import SocialIcon from "./IconSocial"
//import CustomMaterialSymbol from "./IconSymbols"

export const IconTypes = {
  bootstrap: "bootstrap",
  feather: "feather",
  social: "social",
  material: "material",
} as const;

export type IconType = typeof IconTypes[keyof typeof IconTypes];

interface IconProps {
  type: IconType;
  name: string;
  size?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
  fill?: boolean;
  grade?: number;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style?: React.CSSProperties; // Add type for style prop
}

const Icon: React.FC<IconProps> = ({ type = "bootstrap", name = "Search", size, color, className, onClick, fill, grade, weight, style }) => {
  return (
    <>
      {type === "bootstrap" && <BootstrapIcon name={name} size={size} color={color} className={className} />}
      {type === "feather" && <FeatherIcon name={name} size={size} color={color} className={className} />}
      {type === "social" && <SocialIcon network={name} size={size} bgColor={color} className={className} onClick={onClick} />}
      {type === "material" && <CustomMaterialSymbol icon={name} size={size} color={color} className={className} onClick={onClick} fill={fill} grade={grade} weight={weight} style={style} />}
    </>
  );
};

export default Icon;
