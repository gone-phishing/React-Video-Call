import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
			<div>
				<Navbar fixedBottom>
				  	<Navbar.Header>
				    	<Navbar.Text>
				      		© Flinkseed Research 2017 - {(new Date()).getFullYear()}
				    	</Navbar.Text>
				    	<Navbar.Toggle />
				  	</Navbar.Header>
				  	<Navbar.Collapse>
					  	<Nav pullRight>
					    	<NavItem eventKey={1} href="#">
					     		About
					    	</NavItem>
					    	<NavItem eventKey={2} href="#">
					      		Contact
					    	</NavItem>
					    	<NavItem eventKey={3} href="#">
					      		Careers
					    	</NavItem>
					    	<NavItem eventKey={4} href="#">
					      		Privacy
					    	</NavItem>
					    	<NavItem eventKey={5} href="#">
					      		Terms of Use
					    	</NavItem>
					  </Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
export default Footer;