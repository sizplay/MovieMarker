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
      lat: '',
      lon: '',
      points: [],
      error: ''
    };
    this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      this.getLocations,
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 1 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  getLocations(state) {
    const success = (pos) => {
      const coords = pos.coords;
      const lat = coords.latitude.toFixed(6);
      const lon = coords.longitude.toFixed(6);
      // fetch(`https://api.tomtom.com/search/2/nearbySearch/.JSON?key=X00cnasclWOj31PE35FcEmTYJO7TEAYl&lat=${lat}&lon=${lon}&radius=50`)
      fetch(`https://api.tomtom.com/search/2/nearbySearch/.JSON?key=X00cnasclWOj31PE35FcEmTYJO7TEAYl&lat=40.728157&lon=-73.957797&radius=50`)
        .then(result => {
          return result.json();
        })
        .then(data => {
          this.setState({ text: '', lat, lon, points: data.results });
        });
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (state == ViroConstants.TRACKING_NORMAL) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else if (state == ViroConstants.TRACKING_NONE) {
      // handle loss of tracking
    }
  }

  render() {
    const { lat, lon } = this.state;
    return (
      <ViroARScene onTrackingUpdated={this.getLocations} >
        {
          this.state.points.map((point) => {
            const measure = (lat1, lon1, lat2, lon2) => {
              const R = 6378.137;
              const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
              const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
              const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) *
                Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              const d = R * c;
              return d * 100;
            };

            let Z = measure(lat, lon, point.position.lat, lon);
            let X = measure(lat, lon, lat, point.position.lon);

            if (lat < point.position.lat) {
              X = -X;
            }

            if (lon > point.position.lon) {
              Z = -Z;
            }

            return (<ViroText
              key={point.id}
              text={point.poi.name}
              scale={[0.5, 0.5, 0.5]}
              position={[X, -1, Z]}
              style={styles.text}
            />);
          })
        }
        <ViroText text={this.state.text} scale={[0.5, 0.5, 0.5]} position={[0, -2, -2]} style={styles.text} />
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

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
