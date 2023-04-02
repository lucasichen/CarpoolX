import react, { useState, useEffect } from "react";
import {StyleSheet, View, SafeAreaView, Dimensions, Text, PermissionsAndroid, Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import CustomButton from "../CustomButton/CustomButton";

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height*0.5
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const GoogleMaps = () => {

    const [currentLongitude, setCurrentLongitude] = useState(-122.08);
    const [currentLatitude, setCurrentLatitude] = useState(37.24);
    const [locationStat, setLocationStat] = useState('');
    
    const requestLocationPermission = async () => {
      
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          setLocationStat('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
      

    const getOneTimeLocation = () => {
      setLocationStat('Getting Location ...');
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          setLocationStat('You are Here');
          setCurrentLongitude(position.coords.longitude);
          setCurrentLatitude(position.coords.latitude);
        },
        (error) => {
          setLocationStat(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000
        },
      );
    };

    const getLocation = () => {
      requestLocationPermission();
    }

    return (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
              <MapView
              style={styles.mapStyle}
              region={{
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
              }}
              customMapStyle={mapStyle}>
              <Marker
                  draggable
                  coordinate={{
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                  }}
                  onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  title={'Test Marker'}
                  description={'This is a description of the marker'}
              />
              </MapView>
          </View>
          <View>
            <CustomButton 
              title='Get Location'
              onPress= {getLocation}
              type="PRIMARY" />
          </View>
        </SafeAreaView>
    )
}

export default GoogleMaps

const mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}],
    },
];
  
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  mapStyle: {
      width: '100%',
      height: '100%',
      flex: 1
  },
});