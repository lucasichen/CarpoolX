import { View, Text } from 'react-native'
import React from 'react'

/**
 * 
 * @description This is the HomeScreen component. It is the first screen that the user sees when they open the app.
 * @returns {JSX.Element} The HomeScreen component
 */
const HomeScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 24, alignSelf: 'center'}}>Home</Text>
    </View>
  )
}

export default HomeScreen