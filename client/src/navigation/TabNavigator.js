import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Icon from '../components/common/Icon'


const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    return(
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {borderTopWidth: 2, borderTopColor: 'lightgray', borderRadius: 10, height: 60},
            tabBarInactiveTintColor: 'lightgray',
            tabBarActiveTintColor: 'black',
        }}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarIcon: (color) => (
                <Icon name="home" color={color} size={40} />
                ),
        }}/>
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarIcon: (color) => (
                <Icon name="person-circle" type="ionicon" color={color} size={40} />
                ),
        }}/>
    </Tab.Navigator>
    )
}

export default TabNavigator