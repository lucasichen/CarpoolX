import { View, Text, StyleSheet, SafeAreaView, ScrollView, SectionList } from 'react-native'
import React, {useState} from 'react'
import GoogleMaps from '../../components/Maps/GoogleMaps'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'
import { REACT_NATIVE_GOOGLE_MAPS_APIKEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { getRideOffers } from './joinRideScript'

const JoinRideScreen = () => {

    const navigation = useNavigation()
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [capacity, setCapacity] = useState('')
    const [originGeo, setOriginGeo] = useState(null)
    const [destGeo, setDestGeo] = useState(null)

    const [showPickupError, setPickupError] = useState(false);
    const [showDestError, setDestError] = useState(false);

    const errorMsg = "Please enter a location"

    const onNextPressed = () => {
        if (pickup && destination) {
          const availableRides = getRideOffers(String(destination))
          console.log(availableRides)
          //navigation.navigate('ViewRideOffers')
        }else{
          if (pickup){
            setPickupError(false)
          }
          if (destination){
            setDestError(false)
          }
          if (!pickup){
            setPickupError(true)
          }
          if (!destination){
            setDestError(true)
          }
        }
    }
    return (
        <View>
          <View style={styles.container}>
            <View>
              <GooglePlacesAutocomplete
                  placeholder= {'Pick Up Location'}
                  styles={styles}
                  fetchDetails={true}
                  returnKeyType={"search"}
                  minLength={2}
                  onPress={(data, details = null) => {
                    setPickup(String(data.place_id))
                    setOriginGeo(details.geometry.location)
                  }}
                  enablePoweredByContainer={false}
                  query={{
                      key: REACT_NATIVE_GOOGLE_MAPS_APIKEY,
                      language: 'en',
                  }}
                  nearbyPlacesAPI='GooglePlacesSearch'
                  debounce={400}
              />
            </View>
            <View style={styles.errorContainer}>
              {showPickupError && <Text style={styles.errorMsg}>{errorMsg}</Text>}
            </View>
          </View>
          <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder= {"Where to"}
                styles={styles}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                onPress={(data, details = null) => {
                  setDestination(String(data.place_id))
                  setDestGeo(details.geometry.location)
                }}
                enablePoweredByContainer={false}
                query={{
                    key: REACT_NATIVE_GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
            <View style={styles.errorContainer}>
              {showDestError && <Text style={styles.errorMsg}>{errorMsg}</Text>}
            </View>
            <View style={styles.capacity}>
              <Text>
              How many people in the ride?
              </Text>
              <CustomInput
                placeholder="Enter a number between 1-5"
                value={capacity}
                setValue={setCapacity}
              />
            </View>
          </View>
          <GoogleMaps />
          <CustomButton 
            text='Confirm'
            onPress={onNextPressed}
            type="RIDE"
          />
        </View>
    )
}

export default JoinRideScreen

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      paddingTop:10,
      paddingBottom: 0,
      flex: 0
  },
  textInput: {
      backgroundColor: '#DDDDDF',
      borderRadius: 0,
      fontSize: 18,
  },
  textInputContainer: {
      paddingHorizontal: 20,
      paddingBottom: 0,
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
  },
  errorContainer: {
    height: 15,
    marginLeft: 20,
  },
  capacity: {
    marginLeft: 20,
  },
  buttonStyle: {
    marginTop: 40
  },
})