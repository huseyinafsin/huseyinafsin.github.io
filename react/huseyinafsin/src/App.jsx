import styles from './App.css';
import './assets/scripts/scripts.js'
import 'https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js'
import GitHubCalendar from 'react-github-calendar';
import { Image, Card, Col, Container, Row } from 'react-bootstrap';
import Slider from './components/slider/Slider'
function App() {

  const logos =[
    {name:"net", url:"https://upload.wikimedia.org/wikipedia/commons/7/7d/Microsoft_.NET_logo.svg"},
    {name:"react", url:"https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"},
    {name:"spring", url:"https://upload.wikimedia.org/wikipedia/commons/7/79/Spring_Boot.svg"},
  ];
  


  return (

    <Container className="h-container">
    <Row>
      <Col md={8} >
        <Row >
          <Col md={5} >
            <Card className="card-profile">
            {/* <Image id='profile' src={require('./assets/img/profile.jpeg')}  alt='ds'/> */}
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
                <iframe style={{}} className='m-0 p-0 p-md-0'  src="https://open.spotify.com/embed/track/6p8eFfPw3nQkf37aT3AkmK?utm_source=generator&theme=0" width="100%" height="80" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>                </Card>
            </Row>
          </Col>
        </Row>
          <Card className="card-work">
          <div className="calendar">
          <GitHubCalendar 
            username="huseyinafsin" 
            fontSize={16}
            transformData={12}
          />
          </div>
          </Card>
      </Col>
      <Col md={4}>  
        <Row>
          <Card className="card-temp">

          </Card>
        </Row>
        <Row>
            <Slider logos={logos}></Slider>
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
