import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

/**
 * 
 * @description api call to register user route
 * @param {*} email 
 * @param {*} password 
 * @param {*} callback 
 */
function registerUser(email, password, callback) {
    return fetch('http://10.0.2.2:5000/register', {
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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const onRegisterPressed = () => {
        registerUser(email, password, success => {
          if (success) {
            console.warn('Successfully registered');
            navigation.navigate('Login');
          } else {
            console.error('Invalid email or password');
          }
        });
      };
        
    const onTermsOFUsePressed = () => {
        navigation.navigate('TermsOfUse');
    }
    const onPrivacyPolicyPressed = () => {
        navigation.navigate('PrivacyPolicy');
    }
    const onLoginPressed = () => {
        navigation.navigate('Login');
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Create an Account</Text>
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername} />
                <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail} />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry/>
                <CustomInput
                placeholder="Confirm Password"
                value={confirmPassword}
                setValue={setConfirmPassword} 
                secureTextEntry/>
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
});

export default RegisterScreen;