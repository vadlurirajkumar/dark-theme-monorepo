"use client"
import React, { useState } from "react";
import Image from "next/image";


interface AvatarProps {
  users: { src: any; alt: string }[] | { src: any; alt: string };
  iconWidth:number;
  iconHeight:number;
}

const AvatarGroup: React.FC<AvatarProps> = ({ users, iconWidth, iconHeight }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const avatars = Array.isArray(users) ? users : [users];

  return (
    <div className="d-flex align-items-center">
      {avatars.map((user, index) => (
        <div
          key={index}
          className="avatar-container"
          style={{
            zIndex: hoverIndex === index ? 10 : avatars.length - index,
          }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <Image
            src={user.src}
            alt={user.alt}
            width={iconWidth}
            height={iconHeight}
            className="avatar-img"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
