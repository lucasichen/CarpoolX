import { View, Text } from 'react-native'
import React from 'react'
import GoogleMaps from '../../components/Maps/GoogleMaps'
import SearchLocation from '../../components/SearchCard/SearchLocation'
import CustomButton from '../../components/CustomUserIcon/CustomUserIcon'
import { useNavigation } from '@react-navigation/native'

const RequestRideScreen = () => {

    const navigation = useNavigation()
    cosnt [pickup, setPickup] = useState(null)
    cosnt [destination, setDestination] = useState(null)

    const onNextPressed = () => {
        if (pickup && destination) {
            navigation.navigate('PeopleShare', { pickup, destination })
        }
    }
    return (
        <View>
        <SearchLocation 
            text='Pick up location'
            onSetLocation={setPickup} />
        <SearchLocation 
            text='Where to'
            onSetLocation={setDestination} />
        <GoogleMaps />
        <CustomButton 
            text='Next'
            onPress={onNextPressed}
            type="PRIMARY"
        />

        </View>
    )
}

export default RequestRideScreen