import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import AppStack from './AppStack';
// import RateModal from "../screens/RateModalScreen";

const Stack = createNativeStackNavigator();

/**
 * @description This is the main navigation component. It contains all the screens that are available in the app.
 */
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
        <Stack.Screen name="Home_App" component={AppStack} />
        {/* <Stack.Screen name="RateModal" component={RateModal} options={{ presentation: 'modal' }} /> */}
    </Stack.Navigator>
)
}

export default AuthStack
