import { Carousel } from "react-responsive-carousel";
  
function Slider() {
    return (
        <Carousel>
        <div>
            <img src="../assets/img/background.jpg" />
            <p className="legend">Legend 1</p>
        </div>
        <div>
            <img src="../assets/img/background.jpg" />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img src="../assets/img/background.jpg" />
            <p className="legend">Legend 3</p>
        </div>
        </Carousel>
    );
}

export default Slider;
