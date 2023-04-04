import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { findTaxi } from './codeScript';
import Icon from '../../components/common/Icon';

const QRCodeScreen = () => {
  const [code , setCode] = useState('')
  const [showError, setShowError] = useState(false)
  const [showEError, setShowEError] = useState('Please enter valid taxi code');
  const navigation = useNavigation();
  
  const handleSubmitCode = () => {
    if (code === '') {
      setShowError(true);
      setShowEError('Please enter valid taxi code');
    } else {
      findTaxi(code);
    }
  }
  /**
     * @description Resets the variables to their initial state if the user navigates away from this screen
     */
  const resetVars = useCallback(() => {
    return () => {
        setCode('');
        setShowError(false);
    }
  }, [])
  useFocusEffect(resetVars);  // reset the variables when the user navigates away from this screen


  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.container_title}>
            <Text style={styles.title}>Verify Taxi</Text>
        </View>
        <View style={styles.container_taxi}>
          <Icon style="taxi" name="taxi" color="#3B7CFF" size={100}/>
        </View>
        <View style={styles.container_text}>
          <Text style={styles.instructions}>Please enter the code displayed on the taxi's door.</Text>
        </View>
        <CustomInput
          placeholder="Enter Taxi Code"
          value={code}
          setValue={setCode}
          type="ionicon"
          icon="barcode" />
        <View style={styles.error}>
            {showError && <Text style={styles.error_message}>{showEError}</Text>}
        </View>
        <CustomButton
            text="Submit Code"
            onPress={handleSubmitCode}
            type="PRIMARY"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
      backgroundColor: 'white',
      alignItems: 'center',
      padding: 20,
      height: '100%',
      paddingTop: 40,
  },
  container: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    marginTop: 70,
  },
  container_title: {
      maxWidth: 300,
      flexDirection: 'row',
  },
  container_taxi: {
    marginTop: 20,
  },
  container_text: {
    marginTop: 20,
    width: '80%',
  },
  instructions: {
    textAlign: 'center',
    color: 'black',
  },
  error: {
      height: 20,
      width: '100%',
      alignItems: 'flex-start',
  },
  error_message: {
      color: 'red',
      fontSize: 12,
      marginBottom: 5,
      marginLeft: 10,
  },
  title: {
      fontSize: 40,
      fontFamily: 'UberMoveTextBold',
      color: 'black',
    },
});

export default QRCodeScreen