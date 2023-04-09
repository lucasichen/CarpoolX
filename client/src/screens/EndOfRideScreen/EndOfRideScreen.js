import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const EndOfRideScreen = ({route}) => {
    const navigation = useNavigation();


    return (
      <View style={styles.root}>
          <Text style={{ fontSize: 20 }}>Thank You For Completing Your Trip!</Text>
          <CustomButton
            text={"Rate Your Fellow Riders"}
            onPress={() => navigation.navigate('RateUser')}
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
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height: '100%',
    }
});

export default EndOfRideScreen;
