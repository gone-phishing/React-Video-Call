import React, { Component } from 'react';
import { MenuItem,Navbar, Nav, NavItem, NavDropdown, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import firebase from '../../helpers/Firebase.js';

let friendID;

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: false,
			userProfile: null
		}
	}

	componentDidMount() {
	    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
	      	this.setState({ isSignedIn: !!user, userProfile: user });
	    });
 	 }

 	 componentWillUnmount() {
    	this.unregisterAuthObserver();
  	}

	callWithVideo(video) {
    	const config = { audio: true };
    	config.video = video;
    	return () => this.props.startCall(true, friendID, config);
  	}

	render() {
		const { clientId } = this.props;
		return (
			<div>
				<Navbar fixedTop>
				  	<Navbar.Header>
				    	<Navbar.Brand>
				      		<a href="#home">Share Connect</a>
				    	</Navbar.Brand>
				    	<Navbar.Toggle />
				  	</Navbar.Header>
				  	<Navbar.Collapse>
				  		<Navbar.Text>
      						Live at: {clientId}
    					</Navbar.Text>
    					<Navbar.Form pullLeft>
      						<FormGroup>
        						<FormControl type="text" placeholder="Your friend ID" onChange={event => friendID = event.target.value}/>
      						</FormGroup>{' '}
      						<Button
				              	className="facetime-video"
				              	onClick={this.callWithVideo(true)}>
				              	<Glyphicon glyph="facetime-video" />
				            </Button>{' '}
				            <Button
				              	className="earphone"
				              	onClick={this.callWithVideo(false)}>
				              	<Glyphicon glyph="earphone" />
				            </Button>
    					</Navbar.Form>
					  	<Nav pullRight>
					    	<NavItem eventKey={1} href="#">
					     		Invite
					    	</NavItem>
					    	<NavItem eventKey={2} href="#">
					      		Settings
					    	</NavItem>
					    	<NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
					      		<MenuItem eventKey={3.1}>Profile</MenuItem>
					      		<MenuItem eventKey={3.2}>{this.state.isSignedIn ? ("Logout") : ("Login")}</MenuItem>
					      		<MenuItem divider />
					      		<MenuItem eventKey={3.4}>Feedback</MenuItem>
					    	</NavDropdown>
					  </Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

Header.propTypes = {
  	clientId: PropTypes.string.isRequired,
  	startCall: PropTypes.func.isRequired
};
export default Header;