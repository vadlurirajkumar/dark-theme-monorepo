import AvatarGroup from "@/dashboardComponents/Avatars"
import SMcards from "@/dashboardComponents/SMcards"
import { Row, Col } from "react-bootstrap"
import User1 from "../../../../public/assets/users/user1.png";
import User2 from "../../../../public/assets/users/user2.png";
import User3 from "../../../../public/assets/users/user3.png";

const users = [
  { src: User1, alt: "User 1" },
  { src: User2, alt: "User 2" },
  { src: User3, alt: "User 3" },
];

const page = () => {
  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="">
          <h6 className="text-black">Dashboard</h6>
          <p className="text-gray font-light p-sm">Central Hub for Personal Customization</p>
        </div>
        <div className="">
          <button className="btn btn-white border shadow-sm "><label className="text-black">View profile</label></button>
        </div>
      </div>
      <Row>
        <Col md={4}>
          <div className="">
            <Row>
              <SMcards />
            </Row>
          </div>
        </Col>
        <Col md={8}>
          <div className="shadow-sm border rounded p-3 mb-3 bigCard" style={{ height: "324px" }}>
            <div className="w-50 p-5 d-flex flex-column gap-3">
              <AvatarGroup users={users} iconHeight={40} iconWidth={40} />
              <h5 className="text-black font-bold">Connect Today & Join <br />
                <span className="text-primary font-bold">KeenThemes Network</span></h5>
              <p className="text-gray font-light p-sm">Enhance your projects with premium themes and
                templates. Join the KeenThemes community today
                for top-quality designs and resources.</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default page