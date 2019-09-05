import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapGL, {NavigationControl} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
const TOKEN = 'pk.eyJ1IjoidmFuZG5ha2Fwb29yIiwiYSI6ImNqemVrZWd1ejAwMHczbnBoN281ZGk5bmwifQ.5Zu--NifaKp_tSQDR9YdRw';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};
export default class Map extends Component {

constructor(props) {
    super(props);
    var geocoder = new Geocoder({ accessToken: TOKEN });
    this.state = {
      viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
      },
    };
  }
 mapRef = React.createRef()
 
  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
   // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
   handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }
 
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }
render() {
    const {viewport} = this.state;
    console.log(viewport);
return (
      <MapGL
        ref={this.mapRef}
        {...viewport}
        mapStyle="mapbox://styles/denizzed/cjyu2kr5e0rqq1cry6wmo3rhg"
        mapboxApiAccessToken={TOKEN} 
        onViewportChange={this.handleViewportChange}
        >
        <div className="nav" style={navStyle}>
          <NavigationControl/>
        </div>
        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={TOKEN}
        />
      </MapGL>
    );
  }
}