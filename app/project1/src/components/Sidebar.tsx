"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@example/default";
import Image from "next/image";
import Logo from "../../public/default-logo.svg";
import { useState } from "react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

interface MenuItem {
  name: string;
  icon: string;
  path: string;
  subItems?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubmenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleMouseEnter = (name: string) => {
    if (isCollapsed) {
      setHoverTimeout(setTimeout(() => {
        setOpenMenus((prev) => ({ ...prev, [name]: true }));
      }, 200)); // 200ms delay before opening
    }
  };

  const handleMouseLeave = (name: string) => {
    if (isCollapsed) {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      setOpenMenus((prev) => ({ ...prev, [name]: false }));
    }
  };

  const menuItems: MenuItem[] = [
    { name: "Home", icon: "Grid", path: "/" },
    {
      name: "Assets",
      icon: "Wallet",
      path: "/assets",
      subItems: [
        { name: "Peoples", icon: "People", path: "/assets/peoples" },
        { name: "Code", icon: "CodeSquare", path: "/assets/code" },
      ],
    },
    { name: "Notification", icon: "AppIndicator", path: "/notifications" },
    { name: "Settings", icon: "Gear", path: "/settings" },
  ];

  return (
    <div
      className={`sidebar d-flex flex-column vh-100 ${isCollapsed ? "collapsed" : ""}`}
      style={{ width: isCollapsed ? "65px" : "250px", transition: "width 0.3s" }}
    >
      {/* Logo & Toggle Button */}
      <div className={`p-4 mb-3 d-flex ${!isCollapsed ? "justify-content-between" : "justify-content-center"} align-items-center`}>
        <div className={`d-flex align-items-center ${isCollapsed ? "justify-content-center" : "justify-content-start"} gap-2`}>
          {!isCollapsed ? (
            <Image src={Logo} alt="Logo" />
          ) : (
            <Image
              width={24}
              height={24}
              src={"https://keenthemes.com/static/metronic/tailwind/dist/assets/media/app/mini-logo.svg"}
              alt="Logo"
            />
          )}
        </div>
        <div className="toggle-btn" onClick={toggleSidebar}>
          <Icon type="feather" name={!isCollapsed ? "ArrowLeftCircle" : "ArrowRightCircle"} size="18" className="b-w" />
        </div>
      </div>

      {/* Navigation Links */}
      {menuItems.map(({ name, icon, path, subItems }) => (
        <div 
          key={name} 
          className="menu-item position-relative"
          onMouseEnter={() => handleMouseEnter(name)}
          onMouseLeave={() => handleMouseLeave(name)}
        >
          <div className={`px-3 py-3 d-flex align-items-center ${isCollapsed ? "justify-content-center px-2" : ""}`}>
            <Link
              href={path}
              className={`text-decoration-none d-flex align-items-center ${isCollapsed ? "justify-content-center" : "ms-3"} text-black w-100`}
              style={{ whiteSpace: "nowrap" }}
              onClick={subItems ? (e) => { e.preventDefault(); toggleSubmenu(name); } : undefined}
            >
              <Icon type="bootstrap" name={icon} size="18" className="b-w sidebar-icon me-2" />
              <label className="navItem font-medium">{!isCollapsed && name}</label>
              {subItems && !isCollapsed && (
                <Icon type="feather" name={openMenus[name] ? "Minus" : "Plus"} size="12" className="ms-auto text-gray" />
              )}
            </Link>
          </div>

          {/* Submenu as a Tooltip when Sidebar is Collapsed */}
          {subItems && isCollapsed && openMenus[name] && (
            <div className="submenu-tooltip position-absolute bg-white shadow-sm p-2 rounded">
              {subItems.map(({ name, icon, path }) => (
                <Link key={name} href={path} className="d-flex align-items-center gap-2 text-decoration-none px-3 py-2 text-black w-100">
                  <Icon type="bootstrap" name={icon} size="16" className="sidebar-icon" />
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Expanded submenu when sidebar is open */}
          {subItems && openMenus[name] && !isCollapsed && (
            <div className="submenu ps-4">
              {subItems.map(({ name, icon, path }) => (
                <Link key={name} href={path} className="sidebarSubItems font-medium d-flex align-items-center gap-2 text-decoration-none ms-4 p-2 w-75 rounded ">
                  <Icon type="bootstrap" name={icon} size="16" className="sidebar-icon" />
                  <label className="navItem font-medium">{name}</label>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
