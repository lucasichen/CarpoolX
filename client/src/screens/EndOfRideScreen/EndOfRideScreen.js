import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';



const EndOfRideScreen = ({route}) => {
  const navigation = useNavigation()
  const {passengers} = route.params
  const userList = passengers

  return (
    <View style={styles.root}>
        <View style={styles.container}>
        <Text style={styles.title}>Thank You For Completing Your Trip!</Text>
    </View>
        <CustomButton
          text={"Rate Your Fellow Riders"}
          onPress={() => navigation.navigate('RateUser', {paramKey: userList})}
          type="NAME"/>
        <CustomButton
          text={"Go Home"}
          onPress={() => navigation.navigate('Home_Tab')}
          type="NAME"/>
    </View>
  )
}



const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: "100%",
  },
  container: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    padding: 40,
    marginTop: 70,
  },
  title: {
    fontSize: 40,
    fontFamily: 'UberMoveTextBold',
    color: 'black',
    textAlign: 'center',
  },
});

export default EndOfRideScreen;
