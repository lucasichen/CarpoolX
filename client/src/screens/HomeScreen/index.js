import { View, Text } from 'react-native'
import React from 'react'
import GoogleMaps from '../../components/Maps/GoogleMaps'

/**
 * 
 * @description This is the HomeScreen component. It is the first screen that the user sees when they open the app.
 * @returns {JSX.Element} The HomeScreen component
 */
const HomeScreen = () => {
  return (
    <View>
      <View>
        <GoogleMaps />
      </View>
    </View>
  )
}

export default HomeScreen