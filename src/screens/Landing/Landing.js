import React, {useEffect, useState} from 'react';
import './Landing.css';
import DropdownCard from '../../components/DropdownCard/DropdownCard';
import ScrollUp from '../../assets/upIcon.png';

const Landing = () => {
    const [opacity, setOpacity] = useState(1);
    const [showHoverText, setShowHoverText] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = () => {
        const currentYOffset = window.pageYOffset;
        if (currentYOffset > 0) {
            setOpacity(1 - (currentYOffset/700));
        }
        else {
            setOpacity(1);
        }
    }

    const showScrollOption = () => {
        const currentYOffset = window.pageYOffset;
        if (currentYOffset > 200) {
            setShowScrollToTop(true);
        }
        else {
            setShowScrollToTop(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("scroll", showScrollOption, true);
        return (
            window.removeEventListener("scroll", handleScroll)
        );
    })

    return (
        <div className="landingDiv">
            <div className='welcomeText' style={{opacity: opacity}}>
                <h2>welcome to my page.</h2>
                <h2>my name is sankalp verma.</h2>
                <h2>explore my life through this site.</h2>
                <h6>[-- scroll down for more --]</h6>
            </div>
            {showHoverText && 
                <p className="hoverText">
                    go to top
                </p>
            }
            {showScrollToTop && 
                <img src={ScrollUp} className="scrollUp" onClick={scrollToTop} onMouseEnter={() => setShowHoverText(true)} onMouseLeave={() => setShowHoverText(false)} alt="button to scroll to the top"/> 
            }
            <DropdownCard showText={false} title="what is this website." text={["i made this website to not only show my (very limited) web developement skills but also as a place where i can document my life and it just so happens that everyone can also view it along with me"]} />
            <DropdownCard showText={false} title="my plans for this." text={["my plan is to regularly update this website with new features that i want to experiment with, but as a student that might be a hard thing to achieve so a semi-regular update schedule is what i hope to follow"]}/>
            <DropdownCard showText={false} title="the tech i used." text={["for those that are interested, this site is built entirely on the frontend using react-js and a few of its specialised libraries like react redux, react bootstrap and react router to name a few"]} />
            <DropdownCard showText={false} title="upcoming projects for the page" text={["currently testing a simple keyboard based game for the 'my-projects' section", "ui update to the mobile version of the 'about me' page, as the desktop/ipad version of that page has a little more to it", "adding a new blog page, where i can post the plans i have for this website and any other projects i have"]}/>
        </div>
    )
}

export default Landing;