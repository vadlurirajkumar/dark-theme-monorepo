import React from "react";
import { Col } from "react-bootstrap";
import Image from "next/image";
import LinkedinImg from "../../public/assets/linkedin.svg";
import YtImg from "../../public/assets/youtube.svg";
import InstaImg from "../../public/assets/instagram.svg";
import TiktokImg from "../../public/assets/tiktok.svg";

interface CardItem {
  imgSrc: any; 
  count: string;
  text: string;
}

const CardsData: CardItem[] = [
  { imgSrc: LinkedinImg, count: "9.3k", text: "Amazing mates" },
  { imgSrc: YtImg, count: "24k", text: "Lessons Views" },
  { imgSrc: InstaImg, count: "608", text: "New subscribers" },
  { imgSrc: TiktokImg, count: "2.5k", text: "Stream audience" },
];

const SMcards: React.FC = () => {
  return (
    <>
      {CardsData.map((item, i) => (
        <Col sm={6} key={i} className="">
          <div className="border rounded p-3 smCard shadow-sm text-start mb-4">
            <Image src={item.imgSrc} alt={item.text} width={30} height={30} />
            <h3 className="my-2">{item.count}</h3>
            <label className="text-black">{item.text}</label>
          </div>
        </Col>
      ))}
    </>
  )
}

export default SMcards
