import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import GoogleMaps from '../../components/Maps/GoogleMaps'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { REACT_NATIVE_GOOGLE_MAPS_APIKEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const JoinRideScreen = () => {

    const navigation = useNavigation()
    const [pickup, setPickup] = useState(null)
    const [destination, setDestination] = useState(null)

    const [showPickupError, setPickupError] = useState(false);
    const [showDestError, setDestError] = useState(false);

    const errorMsg = "Please enter a location"

    const onNextPressed = () => {
        if (pickup && destination) {
          navigation.navigate('PeopleShare', { pickup, destination })
        }else{
          if (pickup){
            setPickupError(false)
          }
          if (destination){
            setDestError(true)
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
            <GooglePlacesAutocomplete
                placeholder= {'Pick Up Location'}
                styles={styles}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                onPress={(data, details = null) => {
                    setPickup(true)
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
                    setDestination(true)
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
          </View>
          
          <GoogleMaps />
          <CustomButton style={styles.buttonStyle} 
            text='Next'
            onPress={onNextPressed}
            type="PRIMARY"
          />
        </View>
    )
}

export default JoinRideScreen

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
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
  buttonStyle: {
    marginTop: 20
  }
})
