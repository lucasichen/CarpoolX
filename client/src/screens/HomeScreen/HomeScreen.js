import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import NavOptions from '../../components/common/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container_title}>
        <Text style={styles.title}>CarpoolX</Text>
      </View>
      <View style={styles.container_nav}>
        <NavOptions />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    backgroundColor: 'white',
    height: '100%',
  },
  container_title: {
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: 'UberMoveTextMedium',
    color: 'black',
  },
  container_nav: {
    alignItems: 'center',
    marginTop: 25,
  },
})

export default HomeScreen