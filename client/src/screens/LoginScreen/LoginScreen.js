import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import logo from '../../../assets/images/ridesharelogo.jpg';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from '../../components/common/Icon';

/**
 * 
 * @description api call to login user route
 * @param {*} email 
 * @param {*} password 
 * @param {*} callback 
 */
function loginUser(email, password, callback) {
    return fetch('http://10.0.2.2:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          console.log('User logged in');
          callback(true);
        } else {
          callback(false);
        }
      })
      .catch(err => {
        console.log('error: ',err);
        callback(false);
      });
}

/**
 * 
 * @description LoginScreen component
 * @returns {JSX.Element} The LoginScreen component
 */
const LoginScreen = () => {
    const {height} = useWindowDimensions();
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showEError, setShowEError] = useState('Please enter your email');
    const [showPError, setShowPError] = useState('Please enter your password');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /**
     * @description Validates the email and password and calls the login api
     */
    const onSignInPressed = () => {
        let hasError = false;
      
        if (email === '') {
          setShowEmailError(true);
          setShowEError('Please enter your email');
          hasError = true;
        } else if (!emailRegex.test(email)) {
          setShowEmailError(true);
          setShowEError('Please enter a valid email');
          hasError = true;
        } else {
          setShowEmailError(false);
        }
      
        if (password === '') {
          setShowPasswordError(true);
          setShowPError('Please enter your password');
          hasError = true;
        } else if (password.length < 6) {
          setShowPError('Password must be at least 6 characters');
          hasError = true;
        } else {
            setShowPasswordError(false);
        }
      
        if (!hasError) {
          loginUser(email, password, success => {
            if (success) {
              console.log('User logged in');
              navigation.navigate('Home');
            } else {
              setShowPError('Invalid password');
              setShowEError('Invalid email');
            }
          });
        }
      };
      

    /**
     * @description Navigates to the RegisterScreen
     */
    const onRegisterPressed = () => {
        navigation.navigate('Register');
    }

    // navigation object
    const navigation = useNavigation();
    
    /**
     * @description Resets the variables to their initial state if the user navigates away from this screen
     */
    const resetVars = useCallback(() => {
        return () => {
            setUsername('');
            setPassword('');
            setShowEmailError(false);
            setShowPasswordError(false);
        }
    }, [])
    useFocusEffect(resetVars);  // reset the variables when the user navigates away from this screen

    return (
        <View style={styles.root}>
            <Image
                source={logo}
                style={[styles.logo, {height: height*0.35}]}
                resizeMode="contain" />
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setUsername}
                type="fontisto"
                icon="email" />
            <View style={styles.error}>
                {showEmailError && <Text style={styles.error_message}>{showEError}</Text>}
            </View>
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
                type="feather"
                icon="lock" />
            <View style={styles.error}>
                {showPasswordError && <Text style={styles.error_message}>{showPError}</Text>}
            </View>
            <CustomButton
                text="Sign In"
                onPress={onSignInPressed}
                type="PRIMARY"/>
            <CustomButton
                text="Don't have an account? Create one"
                onPress={onRegisterPressed}
                type="TERTIARY"/>
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
    logo: {
        maxWidth: 300,
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
});

export default LoginScreen;