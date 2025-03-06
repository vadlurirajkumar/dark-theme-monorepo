import React from 'react';
import { SocialIcon } from 'react-social-icons';

interface CustomSocialIconProps {
  network: string; // Required prop
  size?: string; // Optional prop
  bgColor?: string; // Optional prop
  className?: string; // Optional prop
  onClick?: () => void; // Optional prop
}

const CustomSocialIcon: React.FC<CustomSocialIconProps> = ({ network, size, bgColor, className, onClick }) => {
  return (
    <SocialIcon
      network={network}
      style={{ height: size, width: size }}
      color={bgColor}
      className={className}
      onClick={onClick}
    />
  );
};

export default CustomSocialIcon;
