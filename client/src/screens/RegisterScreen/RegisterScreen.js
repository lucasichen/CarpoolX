import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation,useFocusEffect } from '@react-navigation/native';

/**
 * 
 * @description api call to register user route
 * @param {*} email 
 * @param {*} password 
 * @param {*} callback 
 */
function registerUser(name, email, password, callback) {
    return fetch('http://10.0.2.2:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          console.log('User registered');
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
 * @description RegisterScreen component
 * @returns {JSX.Element} The RegisterScreen component
 */
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [showNError, setShowNError] = useState('Please enter your name');
  const [showEError, setShowEError] = useState('Please enter your email');
  const [showPError, setShowPError] = useState('Please enter your password');
  const [showCError, setShowCError] = useState('Please confirm your password');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * @description Validates the name, email, password and confirm password and calls the register api
  */
  const onRegisterPressed = () => {
    let hasError = false;
    // ------------------ name validation ------------------
    if (name === '') {
      setShowNameError(true);
      setShowNError('Please enter your name');
      hasError = true;
    } else {  
      setShowNameError(false);
      setShowNError('');
    }
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
    // ------------------ confirm password validation ------------------
    if (confirmPassword === '') {
      setShowConfirmPasswordError(true);
      setShowCError('Please confirm your password');
      hasError = true;
    } else if (confirmPassword.length < 6) {
      setShowConfirmPasswordError(true);
      setShowCError('Password must be at least 6 characters');
      hasError = true;
    } else if (confirmPassword !== password) {
      setShowConfirmPasswordError(true);
      setShowCError('Passwords do not match');
      hasError = true;
    } else {
      setShowConfirmPasswordError(false);
    }
    // ------------------ register user ------------------
    if (!hasError) {
      registerUser(name, email, password, success => {
      if (success) {
        console.warn('Successfully registered');
        navigation.navigate('Login');
      } else {
        setShowPError('Invalid password');
        setShowEError('Invalid email');
      }
    })
    }
  }
  /**
   * @description Navigates to the TermsOfUse screen
   */
  const onTermsOFUsePressed = () => {
      navigation.navigate('TermsOfUse');
  }

  /**
   * @description Navigates to the PrivacyPolicy screen
   */
  const onPrivacyPolicyPressed = () => {
      navigation.navigate('PrivacyPolicy');
  }

  /**
   * @description Navigates to the Login screen
   */
  const onLoginPressed = () => {
      navigation.navigate('Login');
  }

  /**
   * @description Resets the variables to their initial state if the user navigates away from this screen
   */
  const resetVars = useCallback(() => {
    return () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setShowNameError(false);
        setShowEmailError(false);
        setShowPasswordError(false);
        setShowConfirmPasswordError(false);
    }
  }, [])
  useFocusEffect(resetVars);  // reset the variables when the user navigates away from this screen
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an Account</Text>
      <CustomInput
        placeholder="Full Name"
        value={name}
        setValue={setName} 
        type="ionicon"
        icon="person" />
      <View style={styles.error}>
        {showEmailError && <Text style={styles.error_message}>{showNError}</Text>}
      </View>
      <CustomInput
        placeholder="Email"
        value={email}
        setValue={setEmail}
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
      <CustomInput
        placeholder="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword} 
        secureTextEntry
        type="feather"
        icon="lock" />
      <View style={styles.error}>
        {showPasswordError && <Text style={styles.error_message}>{showCError}</Text>}
      </View>
      <CustomButton
          text="Register"
          onPress={onRegisterPressed}
          type="PRIMARY"/>
      <Text style={styles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onTermsOFUsePressed}>Terms of Use</Text> and{' '}
        <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
      </Text>
      <CustomButton
         text="Have an account? Sign in"
        onPress={onLoginPressed}
        type="TERTIARY"/>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    height: '100%',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#051C60",
    margin: 10,
  },
  text: {
    fontSize: 12,
    color: "#051C60",
    margin: 10,
  },
  link: {
    color: "#3B7CFF",
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

export default RegisterScreen;