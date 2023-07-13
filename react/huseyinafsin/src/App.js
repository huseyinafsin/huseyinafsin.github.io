import logo from './logo.svg';
import './App.css';
import './assets/scripts/scripts.js'
import 'https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js'
import GitHubCalendar from 'react-github-calendar';
import { Image, Card, Col, Container, Row } from 'react-bootstrap';
import Slider from './components/Slider'
function App() {

  const selectLastHalfYear = contributions => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;
  
    return contributions.filter(activity => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();
  
      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };
  return (

    <Container className="h-container">
    <Row>
      <Col md={8}>
        <Row>
          <Col md={5}>
            <Card className="card-profile">
            <Image src={require('./assets/img/profile.jpeg')}  alt='ds'/>
            </Card>
          </Col>
          <Col md={7}>
            <Row>
              <Card className="card-about">
                <img src="" alt="" />
              </Card>
            </Row>
            <Row>
                <Card className="card-music">
                  <iframe
                    id="spotify-frame"
                    style={{borderRadius:"12px",
                    maxWidth:"100%",
                    maxHeight:"100%",
                    width:"500px",
                    margin:"2px",
                    height:"123px"}}
                    src="https://open.spotify.com/embed/album/3cyyJALrHc8LawnQNFYRWL?utm_source=generator"
                    frameBorder="0"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </Card>
            </Row>
          </Col>
        </Row>
        <Row>
          <Card className="card-work">
          <GitHubCalendar 
            username="huseyinafsin" 
            fontSize={16}
            transformData={selectLastHalfYear} 
          />
            <div className="calendar"></div>
          </Card>
        </Row>
      </Col>
      <Col md={4}>
        <Row>
          <Card className="card-temp">

          </Card>
        </Row>
        <Row>
          <Card className="card-tech">
            <Slider></Slider>
            {/* <button type="button">
              <span>
                <i className="fas fa-arrow-up" />
              </span>
            </button>
            <div className="logo-box" />
            <div className="logo-box" />
            <div className="logo-box" />
            <button type="button">
              <span>
                <i className="fa fa-arrow-circle-down" aria-hidden="true" />
              </span>
            </button> */}
          </Card>
        </Row>
        <Row>
          <Card className="card-stack" />
        </Row>
      </Col>
    </Row>
  </Container>
  );
}

export default App;
