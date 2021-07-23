import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
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

const MyNavbar = () => {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
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
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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
                <Route path="*" component={Landing}/>
            </Switch>
        </Router>
    )
};

export default MyNavbar;