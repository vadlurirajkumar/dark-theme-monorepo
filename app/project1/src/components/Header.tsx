"use client"
import { useState } from "react"
import AvatarGroup from "@/dashboardComponents/Avatars"
import User1 from "../../public/assets/users/user3.png";

const Header = () => {
  const [dropShow, setDropShow] = useState(false)
  return (
    <div>
      <div className="py-3 px-5 d-flex align-items-center justify-content-between shadow-sm">
        <div className="d-flex align-items-center gap-4">
          <p className="font-medium p-sm navItem">Home</p>
          <p className="font-medium p-sm navItem">Profile</p>
          <p className="font-medium p-sm navItem">My Account</p>
          <p className="font-medium p-sm navItem">Network</p>
        </div>
        <div className="">
          <div className="user-dropdown border border-2 border-success rounded-circle"  onClick={()=> setDropShow(!dropShow)}>
          <AvatarGroup users={[{ src: User1, alt: "User 1" }]} iconHeight={30} iconWidth={30}/>
          </div>
          {dropShow &&
          <div className="drop-menu-list border bg-white rounded shadow-sm">
            <div className="px-3 py-2 d-flex align-items-center gap-2  border-bottom">
            <AvatarGroup users={[{ src: User1, alt: "User 1" }]} iconHeight={40} iconWidth={40}/>
            <div className="d-flex flex-column">
              <p className="text-black p-sm font-semi-bold">Cody Fisher</p>
              <label className="label-sm navItem">c.fisher@gmail.com</label>
            </div>
            </div>
            <p className="drop-item px-3 py-2 p-sm font-light">Item1</p>
            <p className="drop-item px-3 py-2 p-sm font-light">Item2</p>
            <p className="drop-item px-3 py-2 p-sm font-light">Item3</p>
            <p className="drop-item px-3 py-2 p-sm font-light">Item4</p>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Header