import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import HomeScreen from '../Screens/Home/HomeScreen'

const Stack = createStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name={'Home Screen'} component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack