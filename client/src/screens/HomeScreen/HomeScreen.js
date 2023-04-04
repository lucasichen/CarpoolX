import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import NavOptions from '../../components/common/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container_title}>
        <Text style={styles.carpool}>Carpool</Text><Text style={styles.x}>X</Text>
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
    flexDirection: 'row',
  },
  carpool: {
    fontSize: 30,
    fontFamily: 'UberMoveTextBold',
    color: 'black',
  },
  x: {
    fontSize: 30,
    fontFamily: 'UberMoveTextBold',
    color: '#7fa9c1',
  },
  container_nav: {
    alignItems: 'center',
    marginTop: 25,
  },
})

export default HomeScreen