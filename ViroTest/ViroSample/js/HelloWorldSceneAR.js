'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroConstants,
} from 'react-viro';


export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      text: 'Initializing AR...',
      points: []
    };
    this._onInitialized = this._onInitialized.bind(this);
  }

  _onInitialized(state) {
    const success = (pos) => {
      const crd = pos.coords;
      const latitude = crd.latitude.toFixed(6);
      const longitude = crd.longitude.toFixed(6);
      fetch(`https://api.tomtom.com/search/2/nearbySearch/.JSON?key=X00cnasclWOj31PE35FcEmTYJO7TEAYl&lat=${latitude}&lon=${longitude}&radius=100`)
        .then(result => {
          return result.json();
        })
        .then(data => {
          this.setState({ text: data.results[0].poi.name, points: data.results });
        });
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    if (state == ViroConstants.TRACKING_NORMAL) {

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {
          this.state.points.map((point, index) => <ViroText key={point.id} text={point.poi.name} scale={[0.5, 0.5, 0.5]} position={[0, 0, index]} style={styles.helloWorldTextStyle} />)
        }
        <ViroText text={this.state.text} scale={[0.5, 0.5, 0.5]} position={[0, -2, -2]} style={styles.helloWorldTextStyle} />
        <ViroImage
          position={[0, 0.5, -2]}
          height={2}
          width={2}
          placeholderSource={require('./res/MovieMarkerLogo.png')}
          source={require('./res/MovieMarkerLogo.png')}
        />
        <ViroImage
          position={[2, 1, -2]}
          height={2}
          width={2}
          placeholderSource={require('./res/StayPuff.jpg')}
          source={require('./res/StayPuff.jpg')}
        />
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
