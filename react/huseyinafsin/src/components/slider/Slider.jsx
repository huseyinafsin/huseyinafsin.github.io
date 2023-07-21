import {SiDotnet, SiSpringboot} from "react-icons/si";
import {RiReactjsLine} from "react-icons/ri";
import {BiLeftArrow, BiRightArrow} from "react-icons/bi"
import "./slider.css";
import { Card, Image } from "react-bootstrap";


function Slider(props) {
  return (
    <Card className="card-tech">
      <button className="btn-slide" type="button">
        <BiLeftArrow></BiLeftArrow>
      </button>
      
      <div className="logo-wrap">
        <div className="logo-box" >
          <SiSpringboot size={50} style={{background:"white"}} ></SiSpringboot>
          < hr className="progress"/>
        </div>
        <div className="logo-box" >
          <SiDotnet size={50} ></SiDotnet>
        </div>
        <div className="logo-box">
          <RiReactjsLine size={50} ></RiReactjsLine>
        </div>
      
      </div>
      <button className="btn-slide" type="button">
        <BiRightArrow></BiRightArrow>
      </button>
    </Card>
  );
}

export default Slider;
