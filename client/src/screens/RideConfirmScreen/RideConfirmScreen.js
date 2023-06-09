import {View, StyleSheet, Dimensions, SafeAreaView, Image, Text} from 'react-native'
import React, {useRef, useEffect, useState} from 'react'
import MapView, {Marker} from 'react-native-maps'
import { useNavigation, useRoute } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import { REACT_NATIVE_GOOGLE_MAPS_APIKEY } from '@env'
import CustomButton from '../../components/CustomButton/CustomButton';
import { startRide, retrieveTokens } from './startRideScript';


const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height*0.7
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const RideConfirmScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {originGeo, destGeo, pickup, destination, capacity} = route.params
  const origin = { latitude: originGeo.lat, longitude: originGeo.lng}
  const destinationL = { latitude: destGeo.lat, longitude: destGeo.lng}
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const priceFare = (5 + (0.81*distance) + 0.4*duration).toFixed(2) 

  const mapRef = useRef(null);

  const onStartPressed = async () => { 
    let tokens = await retrieveTokens()
    const taxiToFind = await startRide(tokens.idToken, pickup, destination, capacity)
    console.log(taxiToFind)
    navigation.navigate("ViewPeopleStart", {taxiToFind})
  }

  useEffect(() => {
      if (!origin || !destinationL) return;
      mapRef.current.fitToSuppliedMarkers(["origin","destinationL"], {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50}
      });
  }, [origin, destinationL])

  return (
      <SafeAreaView>
          <View style={styles.container}>
          <MapView
              ref={mapRef}
              style={styles.mapStyle}
              customMapStyle={mapStyle}
              initialRegion={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
              }}
          >
              <MapViewDirections
                  origin={origin}
                  destination={destinationL}
                  apikey={REACT_NATIVE_GOOGLE_MAPS_APIKEY}
                  strokeWidth={5}
                  strokeColor='#3B7CFF'
                  onReady={ result => {
                      setDistance(result.distance.toFixed(1))
                      setDuration(result.duration.toFixed(0))
                  }}
              />
              <Marker
                  coordinate={{
                      latitude: origin.latitude,
                      longitude: origin.longitude
                  }}
                  title="Origin"
                  identifier="origin"                
              />

              <Marker
                  coordinate={{
                      latitude: destinationL.latitude,
                      longitude: destinationL.longitude
                  }}
                  title="Origin"
                  identifier="destinationL"                
              />

          </MapView> 
          </View>
          <View style={styles.tripInfo}>
              <Image
                  source={{uri:'https://links.papareact.com/3pn'}}
                  style = {styles.imagestyle}
              />
              <View style={styles.container_text}>
                  <Text style={styles.textStyle}>
                      Duration: {duration} min
                  </Text>
                  <Text style={styles.textStyle}>
                      Distance: {distance} km
                  </Text>
                  <Text style={styles.textStyle}>
                      Total Fare Price: ${priceFare}
                  </Text>
              </View> 
          </View>
          <View style={styles.start_button}>
              <CustomButton
                  text="Start Ride"
                  onPress={onStartPressed}
                  type="PRIMARY"
              />
          </View>
      </SafeAreaView>
        
    )
}



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
    height: SCREEN_HEIGHT,
    alignItems: 'center'
  },
  mapStyle: {
      width: '100%',
      height: '100%',
      flex: 1
  },
  buttonStyle: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    color: '#3B7CFF',
    alignItems: 'center',
    borderRadius: 5,
  },
  imagestyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginLeft: 20
  },
  tripInfo: {
    flexDirection: 'row'
  },
  container_text: {
    margin: 50,
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'UberMoveTextBold',
    fontSize: 15,
  },
  start_button: {
    height: 150, 
    alignItems: 'center',
    marginHorizontal: 80
  }
});

export default RideConfirmScreen