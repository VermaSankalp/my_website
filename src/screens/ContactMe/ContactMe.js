import React, {useState} from 'react';
import './ContactMe.css';
import Slider from 'react-slick';
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import apiKey from './emailkey.js';
import emailjs from 'emailjs-com';

const ContactMe = () => {
    const [userInput, setUserInput] = useState('');
    const [userName, setUserName] = useState('');

    const settings = {
      dots: true,
    //   fade: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    }

    const changeUserInput = (event) => {
        const input = event.target.value;
        setUserInput(input);
    }
    const changeUserName = (event) => {
        const input = event.target.value;
        setUserName(input);
    }
    const handleKeyPress = (event) => {
        if (event.code === 'Enter') {
            emailjs.send(apiKey.SERVICE_ID, apiKey.TEMPLATE_ID, {
                from_name: userName,
                to_name: 'Sankalp Verma',
                message: event.target.value
            }, apiKey.USER_ID).then((result) => {
                alert('message sent.', result.text);
                setUserName(''); setUserInput('');
            }).catch((error) => {
                alert('an error has occured, please try again', error.text);
            });
        }
    }
    return (
        <div className="contactMainDiv">
            <h4>check me out on my social media.</h4>
            <Slider {...settings}>
                <div>
                    <Card 
                    bg="light"
                    text="dark"
                    border="success"
                    style={{width: 300}}
                    >
                        <Card.Body>
                            <Card.Title>linkedin.</Card.Title>
                            <Card.Text></Card.Text>
                            <Button variant="outline-dark"><a href="https://www.linkedin.com/in/sankalp-verma-935a361a6/" target="_blank" rel="noreferrer">go to linkedin page.</a></Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card 
                      bg="light"
                      text="dark"
                      border="info"
                      style={{width: 300}}
                    >
                        <Card.Body>
                            <Card.Title>instagram.</Card.Title>
                            <Card.Text>[-- give me a follow pls --]</Card.Text>
                            <Button variant="outline-dark"><a href="https://www.instagram.com/sun_kelp/?hl=en" target="_blank" rel="noreferrer">go to insta page.</a></Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card 
                    bg="light"
                    text="dark"
                    border="primary"
                    style={{width: 300}}
                    >
                        <Card.Body>
                            <Card.Title>...or send me a message instead.</Card.Title>
                            <Card.Text>[-- press enter to submit --]</Card.Text>
                            <input value={userName} onChange={changeUserName} placeholder="your name" style={{marginBottom: 20}} />
                            <input value={userInput} onChange={changeUserInput} onKeyPress={handleKeyPress} placeholder="your message" />
                        </Card.Body>
                    </Card>
                </div>
            </Slider>
        </div>
    )
}

export default ContactMe;