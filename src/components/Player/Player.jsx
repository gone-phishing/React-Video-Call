import React, { Component } from 'react';
import { Button, Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Player extends Component {

	constructor(props) {
		super(props);
		this.state = {
			Video: true,
			Audio: true,
			width:0,
			height:0
		};

		this.btns = [
			{type: 'Video', icon: 'facetime-video'},
			{type: 'Audio', icon: 'volume-up'},
		];

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componenetDidMount() {
		this.updateWindowDimensions();
  		window.addEventListener('resize', this.updateWindowDimensions);
		this.setMediaStream();
	}

	componentWillUnmount() {
  		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
  		this.setState({ 
  			width: (Math.floor(window.innerWidth/2.2)) + 'px', 
  			height: (Math.floor(window.innerHeight/1.5)) + 'px',
  		});
	}

	componentDidUpdate() {
		this.setMediaStream();
	}

	setMediaStream() {
		const { peerSrc, localSrc} = this.props;
		if(this.peerVideo && peerSrc) this.peerVideo.srcObject = peerSrc;
		if(this.localVideo && localSrc) this.localVideo.srcObject = localSrc;
	}

	toggleMediaDevice(deviceType) {
		this.setState({
			[deviceType]: !this.state[deviceType]
		});
		console.log("mediaDevice: " + this.props.mediaDevice);
		this.props.mediaDevice.toggle(deviceType);
	}

	componentWillReceiveProps(nextProps) {
	    // Initialize when the call started
	    this.updateWindowDimensions();
	    if (!this.props.config && nextProps.config) {
	      	const { config, mediaDevice } = nextProps;
	      	_.forEach(config, (conf, type) =>
	        mediaDevice.toggle(_.capitalize(type), conf));

	      	this.setState({
	        	Video: config.video,
	        	Audio: config.audio
	      	});

	    }
  	}

	renderControlButtons() {
		const getClass = (icon, type) => (
			!this.state[type] ? `${icon} disabled` : `${icon}`
		);
		return this.btns.map(btn => (
			<Button
				bsStyle="success"
				key={`btns${btn.type}`}
				className={getClass(btn.icon, btn.type)}
				onClick={() => this.toggleMediaDevice(btn.type)}>
				<Glyphicon glyph={`${btn.icon}`} />
			</Button>
		));
	}

	render() {
		return(
			<div>
				<Grid>
  					<Row className="show-grid">
  						<Col md={12}>
	  						<Row>
		    					<Col md={5}>
		      						<video id="peerVideo" ref={el => this.peerVideo = el} autoPlay width={this.state.width} height={this.state.height}/>
		    					</Col>
		    					<Col md={2}/>
		    					<Col md={5}>
		      						<video id="localVideo" ref={el => this.localVideo = el} autoPlay width={this.state.width} height={this.state.height} muted/>
		    					</Col>
		    				</Row>
    					</Col>
  					</Row>
				</Grid>
        		
        		
        		<div className="video-control">
          			{this.renderControlButtons()}{' '}
          			<Button bsStyle="danger" onClick={() => this.props.endCall(true)}>
          				<Glyphicon glyph="earphone" />
          			</Button>
        		</div>
      		</div>
		);
	}
}

Player.propTypes = {
	status: PropTypes.string.isRequired,
	localSrc: PropTypes.object,
	peerSrc: PropTypes.object,
	config: PropTypes.object,
	mediaDevice: PropTypes.object,
	endCall: PropTypes.func.isRequired
}
export default Player;