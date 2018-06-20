import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

const markerData = [
  {
    name: 'Columbus Circle',
    lat: 40.767391,
    lng: -73.981928,
  },
  {
    name: 'Bow Bridge Central Park',
    lat: 40.778794,
    lng: -73.982068,
  },
  {
    name: '91st Street Garden',
    lat: 40.793237,
    lng: -73.978026,
  },
];

const LATITUDE = 40.772464;
const LONGITUDE = -73.983489;
const LATITUDEDELTA = 0.0922;
const LONGITUDEDELTA = 0.0421;

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDEDELTA,
        longitudeDelta: LONGITUDEDELTA
      },
      markers: markerData || [],
    };
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <MapView
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        provider={MapView.PROVIDER_GOOGLE}
      />
    );
  }
}
//   componentDidMount() {
//     this.setState({ mapLoaded: true });
//   }

//   onRegionChange = (region) => {
//     this.setState({ region });
//   }

//   addToRegion = (region) => {
//     this.onRegionChange(region);
//   }

//   addMarker = marker => {
//     const markers = [...this.state.markers, marker];
//     this.setState({ markers });
//   }

//   // simulateFriendsRecommending = () => {
//   //   if (this.state.isBroadcasting) {
//   //     let counter = this.props.places - 1;
//   //     const nIntervId = setInterval(() => {
//   //       const marker = this.props.places[counter];
//   //       this.addMarker(marker);
//   //       if (!counter) {
//   //         clearInterval(nIntervId);
//   //       }
//   //       counter--;
//   //     }, 1000);
//   //   } else {
//   //     this.setState({ markers: [] });
//   //   }
//   // }


//   renderMarkers = () => {
//     if (!this.state.markers) {
//       return;
//     }
//     return this.state.markers.map(marker => {
//       return (
//         <MapView.Marker
//           key={marker.id}
//           id={marker.place_id}
//           coordinate={{ latitude: marker.lat, longitude: marker.lng }}
//           title={marker.name}
//         />
//       );
//     });
//   }

//   render() {
//     const { mapLoaded, region } = this.state;
//     if (!mapLoaded) {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center' }}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }
//     return (
//             <MapView
//               style={{ flex: 1 }}
//               region={region}
//               provider={MapView.PROVIDER_GOOGLE}
//               showsUserLocation={true}
//               followsUserLocation={true}
//               showsMyLocationButton={true}
//               showsPointsOfInterest={true}
//               showsBuildings={true}
//               onRegionChangeComplete={regions => this.onRegionChange(regions)}
//             >
//               {mapLoaded ? this.renderMarkers() : null}
//             </MapView>
//     );
//   }
// }

export default MapScreen;
