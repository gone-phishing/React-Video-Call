import React, { Component } from 'react';
import './css/App.css';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Player from './components/Player/Player.jsx';
import CallModal from './components/CallModal/CallModal.jsx';
import PeerConnection from './helpers/PeerConnection';
import socket from './helpers/socket';
import _ from 'lodash';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            callWindow: false,
            callModal: false,
            callFrom: '',
            localSrc: null,
            peerSrc: null,
        };
        this.pc = {};
        this.config = null;
        this.startCallHandler = this.startCall.bind(this);
        this.endCallHandler = this.endCall.bind(this);
        this.rejectCallHandler = this.rejectCall.bind(this);
    }

    componentDidMount() {
    socket
        .on('init', data => this.setState({ clientId: data.id }))
        .on('request', data => this.setState({ callModal: true, callFrom: data.from }))
        .on('call', (data) => {
            if (data.sdp) {
                this.pc.setRemoteDescription(data.sdp);
                if (data.sdp.type === 'offer') this.pc.createAnswer();
            } else this.pc.addIceCandidate(data.candidate);
        })
        .on('end', this.endCall.bind(this, false))
        .emit('init');
  }

    startCall(isCaller, friendID, config) {
        this.config = config;
        this.pc = new PeerConnection(friendID)
            .on('localStream', (src) => {
                const newState = { callWindow: true, localSrc: src };
                if (!isCaller) newState.callModal = false;
                    this.setState(newState);
                })
            .on('peerStream', src => this.setState({ peerSrc: src }))
            .start(isCaller, config);
    }

    rejectCall() {
        socket.emit('end', { to: this.state.callFrom });
        this.setState({ callModal:false });
    }

    endCall(isStarter) {
        if (_.isFunction(this.pc.stop)) this.pc.stop(isStarter);
        this.pc = {};
        this.config = null;
        this.setState({
            callWindow: false,
            localSrc: null,
            peerSrc: null
        });
    }
    render() {
        return (
            <div>
                <Header 
                    clientId={this.state.clientId}
                    startCall={this.startCallHandler}
                />
                {
                    this.state.callWindow && 
                    <Player 
                        status={this.state.callWindow}
                        localSrc={this.state.localSrc}
                        peerSrc={this.state.peerSrc}
                        config={this.config}
                        mediaDevice={this.pc.mediaDevice}
                        endCall={this.endCallHandler}
                    />
                }
                {
                    this.state.callModal && 
                    <CallModal
                        startCall={this.startCallHandler}
                        rejectCall={this.rejectCallHandler}
                        callFrom={this.state.callFrom}
                    />
                }
                <Footer />
            </div>
        );
    }
}

export default App;
