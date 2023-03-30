import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, useWindowDimensions } from 'react-native';
import logo from '../../../assets/images/ridesharelogo.jpg';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSignInPressed = () => {
        console.warn('Sign in');
        // validate the username and password
        // if valid, validate the user
        
        // if valid, navigate to the home screen
        navigation.navigate('Home');
    }
    const onForgotPassword = () => {
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
                onPress={onForgotPassword}
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