import React, {useState} from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import logo from '../../../assets/images/ridesharelogo.jpg';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

function loginUser(username, password, callback) {
    return fetch('http://10.0.2.2:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
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

const LoginScreen = () => {
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSignInPressed = () => {
        // validate the username and password
        loginUser(username, password, success => {
          if (success) {
            console.log('User logged in');
            navigation.navigate('Home');
          } else {
            console.error('Invalid username or password');
          }
        });
      };
    const onRegisterPressed = () => {
        console.warn('Register');
        navigation.navigate('Register');
    }
    const navigation = useNavigation();
    return (
        <View style={styles.root}>
            <Image
                source={logo}
                style={[styles.logo, {height: height*0.35}]}
                resizeMode="contain" />
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername} />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry/>
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
});

export default LoginScreen;