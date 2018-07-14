import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';

class CallModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            _notificationSystem: null
        };
    }

    
    componentDidMount() {
        this.setState({_notificationSystem: this.refs.notificationSystem});
        var _notificationSystem = this.refs.notificationSystem;

        _notificationSystem.addNotification({
            message: (
                <div>
                    {this.props.callFrom} is calling. Join using: 
                </div>
            ),
            level: 'info',
            position: 'tr',
            autoDismiss: 0,
            children: (
                <div>
                    <Button
                        bsStyle="success"
                        onClick={this.acceptWithVideo(true)}>
                        <Glyphicon glyph='facetime-video' />
                    </Button>{' '}
                    <Button
                        bsStyle="success"
                        onClick={this.acceptWithVideo(false)}>
                        <Glyphicon glyph='earphone'/>
                    </Button>{' '}
                    <Button 
                        bsStyle="danger"
                        onClick={this.props.rejectCall}>
                        <Glyphicon glyph='remove'/>
                    </Button>
                </div>
            )
        });
    }

    acceptWithVideo(video) {
        const config = { audio: true, video };
        return () => this.props.startCall(false, this.props.callFrom, config);
    }

  render() {
    return (
      <div className="call-modal">
        <NotificationSystem ref="notificationSystem" style={style}/>
      </div>
    );
  }
}

var style= {
    NotificationItem: {
        DefaultStyle: {
            position: 'relative',
            width: '100%',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
            margin: '10px 0 0',
            padding: '10px',
            display: 'block',
            WebkitBoxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            boxSizing: 'border-box',
            opacity: 0,
            transition: 'all 0.5s ease-in-out',
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',

            isHidden: {
                opacity: 0
            },

            isVisible: {
                opacity: 1
            }
        },

        success: {
            borderTop: 0,
            backgroundColor: '#a1e82c',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        error: {
            borderTop: 0,
            backgroundColor: '#fc727a',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        warning: {
            borderTop: 0,
            backgroundColor: '#ffbc67',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        info: {
            borderTop: 0,
            backgroundColor: '#63d8f1',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        }
    },

    Title: {
        DefaultStyle: {
            fontSize: '30px',
            margin: '0',
            padding: 0,
            fontWeight: 'bold',
            color: '#FFFFFF',
            display: 'block',
            left: '15px',
            position: 'absolute',
            top: '50%',
            marginTop: '-15px'
        }

    },

    MessageWrapper: {
        DefaultStyle: {
            marginLeft: '55px',
            marginRight: '30px',
            padding: '0 12px 0 0',
            color: '#FFFFFF',
            maxWidthwidth: '89%'
        }
    },

    Dismiss: {
        DefaultStyle: {
            fontFamily: 'inherit',
            fontSize: '21px',
            color: '#000',
            float: 'right',
            position: 'absolute',
            right: '10px',
            top: '50%',
            marginTop: '-13px',
            backgroundColor: '#FFFFFF',
            display: 'block',
            borderRadius: '50%',
            opacity: '.4',
            lineHeight: '11px',
            width: '25px',
            height: '25px',
            outline: '0 !important',
            textAlign: 'center',
            padding: '6px 3px 3px 3px',
            fontWeight: '300',
            marginLeft: '65px'
        },

        success: {
            // color: '#f0f5ea',
            // backgroundColor: '#a1e82c'
        },

        error: {
            // color: '#f4e9e9',
            // backgroundColor: '#fc727a'
        },

        warning: {
            // color: '#f9f6f0',
            // backgroundColor: '#ffbc67'
        },

        info: {
            // color: '#e8f0f4',
            // backgroundColor: '#63d8f1'
        }
    },

    Action: {
        DefaultStyle: {
            background: '#ffffff',
            borderRadius: '2px',
            padding: '6px 20px',
            fontWeight: 'bold',
            margin: '10px 0 0 0',
            border: 0
        },

        success: {
            backgroundColor: '#a1e82c',
            color: '#ffffff'
        },

        error: {
            backgroundColor: '#fc727a',
            color: '#ffffff'
        },

        warning: {
            backgroundColor: '#ffbc67',
            color: '#ffffff'
        },

        info: {
            backgroundColor: '#63d8f1',
            color: '#ffffff'
        }
    },

    ActionWrapper: {
        DefaultStyle: {
            margin: 0,
            padding: 0
        }
    }
};

CallModal.propTypes = {
  callFrom: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  rejectCall: PropTypes.func.isRequired
};

export default CallModal;