import { View, Text, Dimensions  } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import QRCodeScreen from '../screens/QRCodeScreen'

const { width, height } = Dimensions.get("window")

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    return(
        <View style={{
            width,
            height: height-height/33,
        }}>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {borderTopWidth: 2, borderTopColor: 'lightgray', borderRadius: 10, height: 60},
                tabBarInactiveTintColor: 'lightgray',
                tabBarActiveTintColor: 'black',
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color}) => (
                    <FAIcon name="home" color={color} size={40} />
                    ),
            }} />
            <Tab.Screen
                name="QRCode"
                component={QRCodeScreen}
                options={{
                    tabBarIcon: ({color}) => (
                    <FAIcon name="qrcode" color={color} size={40} />
                    ),
            }} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({color}) => (
                    <Ionicon name="person-circle" color={color} size={40} />
                    ),
            }} />
        </Tab.Navigator>
        </View>
    )
}

export default TabNavigator