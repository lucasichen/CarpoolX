import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { loginUser } from './loginScript'
import * as Keychain from 'react-native-keychain';

/**
 * 
 * @description LoginScreen component
 * @returns {JSX.Element} The LoginScreen component
 */
const LoginScreen = () => {
    const {height} = useWindowDimensions();
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showEError, setShowEError] = useState('Please enter your email');
    const [showPError, setShowPError] = useState('Please enter your password');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // check if user is already logged in
    useEffect(() => {
      // Check if there is a stored password
      Keychain.getGenericPassword().then((credentials) => {
        if (credentials.password) {
          navigation.navigate('Home_App');
        }
        
      });
    }, []);
    /**
     * @description Validates the email and password and calls the login api
     */
    const onSignInPressed = () => {
        let hasError = false;
        // ------------------ email validation ------------------
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
        // ------------------ password validation ------------------
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
        // ------------------ login api call ------------------
        if (!hasError) {
            loginUser(email, password, success => {
            if (success) {
                console.log('User logged in');
                navigation.navigate('Home_App');
            } else {
                setShowPasswordError(true);
                setShowEmailError(true);
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
            <View style={[styles.logo, {height: height*0.35, paddingTop: height*0.15}]}>
                <Text style={styles.carpool}>Carpool</Text><Text style={styles.x}>X</Text>
            </View>
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
                secureTextEntry={secureTextEntry}
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
        flexDirection: 'row',
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
    carpool: {
        fontSize: 40,
        fontFamily: 'UberMoveTextBold',
        color: 'black',
      },
    x: {
        fontSize: 40,
        fontFamily: 'UberMoveTextBold',
        color: '#7fa9c1',
    },
});

export default LoginScreen;