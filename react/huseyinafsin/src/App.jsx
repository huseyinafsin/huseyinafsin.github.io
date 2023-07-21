import styles from './App.css';
import './assets/scripts/scripts.js'
import GitHubCalendar from 'react-github-calendar';
import { Image, Card, Col, Container, Row } from 'react-bootstrap';
import Slider from './components/slider/Slider'
import React from 'react';
function App () {

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
           <Row>
             <Card className="card-profile">
            <Image id='profile' src={require('./assets/img/profile_opac.png')}  alt='Profile'/>
            </Card>
           </Row>
          </Col>
          <Col md={7}>
            <Row>
              <Card className="card-about">
                <h1>Hüseyin Afşin</h1>
                <hr />
                <h4>Software Developer</h4>
                <p>Lorem ipsum, dolor sit amet consectetur 
                  adipisicing elit. Quis quidem voluptates
                   voluptatum dolorem laudantium atque, iustoum.</p>
              </Card>
            </Row>
            <Row>
                <Card className="card-music">
                <iframe style={{height:"153px", borderRadius:"25px"}} className='m-0 p-0 p-md-0'  src="https://open.spotify.com/embed/track/6p8eFfPw3nQkf37aT3AkmK?utm_source=generator&theme=0" width="100%" height="80" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>              
                  </Card>
            </Row>
          </Col>
        </Row>
        <Row>
        <Card className="card-work">
          <div className="calendar">
         <GitHubCalendar 
            username="huseyinafsin" 

          />    
          </div>
          </Card>
        </Row>
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
