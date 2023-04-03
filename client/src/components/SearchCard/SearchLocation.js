import React from 'react'
import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Icon from '../common/Icon'
import { REACT_NATIVE_GOOGLE_MAPS_APIKEY } from '@env'

const SearchLocation = props => {
    return (
        <SafeAreaView>
            <View>
                <GooglePlacesAutocomplete
                    placeholder= {props.text}
                    styles={styles}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    onPress={(data, details = null){
                        props.destination = ()
                        {details.location}
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
        </SafeAreaView>
    )
}

export default SearchLocation

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
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
    }
})