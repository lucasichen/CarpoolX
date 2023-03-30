import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const onRegisterPressed = () => {
        console.warn('Register');
        navigation.navigate('Login');
    }
    const onTermsOFUse = () => {
        console.warn('Terms of Use');
        navigation.navigate('TermsOfUse');
    }
    const onPrivacyPolicy = () => {
        console.warn('Privacy Policy');
        navigation.navigate('PrivacyPolicy');
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
                <Text style={styles.link} onPress={onTermsOFUse}>Terms of Use</Text> and{' '}
                <Text style={styles.link} onPress={onPrivacyPolicy}>Privacy Policy</Text>
            </Text>
            <CustomButton
                text="Have an account? Sign in"
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