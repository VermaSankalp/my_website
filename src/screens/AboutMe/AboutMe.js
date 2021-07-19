import React from 'react';
// import { Image } from 'react-bootstrap';
import './AboutMe.css';
import DropdownCard from '../../components/DropdownCard/DropdownCard';

//Maybe make a "hover here to see what I look like" type ting on this page idk lmao rofl

const AboutMe = () => {
    return(
        <div className="mainAboutDiv">
            <div className="leftDiv">
                {/* <Image src={'/assets/ME.jpg'} className="myImage" roundedCircle/> */}
                <h3>get to know me.</h3>
            </div>
            <div className="rightDiv">
                <DropdownCard showText={true} title="who am i?" text={["a 19 year old indian university student living in hong kong"]}/>
                <DropdownCard showText={true} title="my background" text={["i was born in india and lived there for the first 9 years of my life but move to hong kong in 2012 and have been living here since"]} />
                <DropdownCard showText={true} title="hobbies" text={["nothing too much going on right now but playing badminton is always fun"]} />
                <DropdownCard showText={true} title="interests" text={["watching sports, netflix shows and the usual sort"]} />
            </div>
        </div>
    )
};

export default AboutMe;