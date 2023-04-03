import { View, Text } from 'react-native'
import React from 'react'
import GoogleMaps from '../../components/Maps/GoogleMaps'
import SearchLocation from '../../components/SearchCard/SearchLocation'
import CustomButton from '../../components/CustomUserIcon/CustomUserIcon'
import { useNavigation } from '@react-navigation/native'

const RequestRideScreen = () => {

  const navigation = useNavigation();

  const onNextPressed = () => {
    navigation.navigate('PeopleShare')
  }
  return (
    <View>
      <SearchLocation 
        text='Pick up location'/>
      <SearchLocation 
        text='Where to'/>
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