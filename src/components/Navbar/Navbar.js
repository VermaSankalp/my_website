import React, {useState} from 'react';
// import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import AboutMe from '../../screens/AboutMe/AboutMe';
import TodoList from '../../screens/todoList/TodoList';
import Landing from '../../screens/Landing/Landing';
import ContactMe from '../../screens/ContactMe/ContactMe';
import ForecastDisplay from '../../screens/Forecast/ForecastDisplay';
import EnergyGame from '../../screens/EnergyGameThing/EnergyGame';
import leftIcon from '../../assets/Icons/leftIcon.png';
import rightIcon from '../../assets/Icons/rightIcon.png';
import landingIcon from '../../assets/Icons/landingIcon.png';
import aboutIcon from '../../assets/Icons/aboutIcon.png';
import contactIcon from '../../assets/Icons/contactIcon.png';
import todoIcon from '../../assets/Icons/todoIcon.png';
import weatherIcon from '../../assets/Icons/weatherIcon.png';
import energyIcon from '../../assets/Icons/energyIcon.png';
import './Navbar.css';

const MyNavbar = () => {
    const [open, setOpen] = useState(true);
    const [hidden, setHidden] = useState('');
    const [sideBarWidth, setSideBarWidth] = useState(150);
    const [color, setColor] = useState([]);

    const hoverOver = (number) => {
        if (number === 0) setColor(['white', '', '', '', '', '']);
        else if (number === 1) setColor(['', 'white', '', '', '', '']);
        else if (number === 2) setColor(['', '', 'white', '', '', '']);
        else if (number === 3) setColor(['', '', '', 'white', '', '']);
        else if (number === 4) setColor(['', '', '', '', 'white', '']);
        else if (number === 5) setColor(['', '', '', '', '', 'white']);
    }
    const hoverLeave = () => {
        setColor('');
    }

    const closeSideBar = () => {
        setOpen(false);
        setSideBarWidth(35);
        setHidden('hidden');
    }
    const openSideBar = () => {
        setOpen(true);
        setSideBarWidth(150);
        setHidden('');
    }
    return (
        <Router>
            {/* <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">:o</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link> <Link to="/about">about me</Link> </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link> <Link to="/contact">contact me</Link> </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="my-projects">
                                <NavDropdown.Item> <Link to="/todo">todo-list</Link> </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item> <Link to="/forecast">weather-forecast</Link> </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item> <Link to="/stupid">energy-gen-game</Link> </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> */}
            <div className="sideBarUnorderedList" style={{overflow: hidden, width: sideBarWidth}}>
                <ul style={{width: 150, overflow: 'hidden'}}>
                    <img src={landingIcon} alt="landing icon" onMouseOver={() => hoverOver(0)} onMouseOut={hoverLeave}/>
                    <li style={{backgroundColor: color[0]}} onMouseOver={() => hoverOver(0)} onMouseOut={hoverLeave}><Link to="/">landing</Link></li>
                    <img src={aboutIcon} alt="about icon" onMouseOver={() => hoverOver(1)} onMouseOut={hoverLeave}/>
                    <li style={{backgroundColor: color[1]}} onMouseOver={() => hoverOver(1)} onMouseOut={hoverLeave}><Link to="/about">about-me</Link></li>
                    <img src={todoIcon} alt="todo icon" onMouseOver={() => hoverOver(3)} onMouseOut={hoverLeave}/>
                    <li style={{backgroundColor: color[3]}} onMouseOver={() => hoverOver(3)} onMouseOut={hoverLeave}><Link to="/todo">todo-list</Link></li>
                    <img src={weatherIcon} alt="weather icon" onMouseOver={() => hoverOver(4)} onMouseOut={hoverLeave}/>
                    <li style={{backgroundColor: color[4]}} onMouseOver={() => hoverOver(4)} onMouseOut={hoverLeave}><Link to="/forecast">weather</Link></li>
                    <img src={energyIcon} alt="weather icon" onMouseOver={() => hoverOver(5)} onMouseOut={hoverLeave}/>
                    <li style={{backgroundColor: color[5]}} onMouseOver={() => hoverOver(5)} onMouseOut={hoverLeave}><Link to="/stupid">nrg-game</Link></li>
                    <img src={contactIcon} alt="contact icon" onMouseOver={() => hoverOver(2)} onMouseOut={hoverLeave}/>
                    <li style={{backgroundColor: color[2]}} onMouseOver={() => hoverOver(2)} onMouseOut={hoverLeave}><Link to="/contact">contact-me</Link></li>
                </ul>
                {open && <div onClick={closeSideBar}><img alt="left icon" src={leftIcon}/></div>}
            </div>
            {!open && <div onClick={openSideBar} className="rightIcon"><img alt="right icon" src={rightIcon}/></div>}
            <Switch>
                <Route path="/about">
                    <AboutMe />
                </Route>
                <Route path="/todo">
                    <TodoList />
                </Route>
                <Route path="/contact">
                    <ContactMe />
                </Route>
                <Route path="/forecast">
                    <ForecastDisplay />
                </Route>
                <Route path="/stupid">
                    <EnergyGame />
                </Route>
                <Route path="*" component={Landing}/>
            </Switch>
        </Router>
    )
};

export default MyNavbar;