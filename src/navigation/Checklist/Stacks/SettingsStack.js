import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import SettingsScreen from '../Screens/Settings/SettingsScreen'

const Stack = createStackNavigator()

const SettingsStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name={'Settings Screen'} component={SettingsScreen} />
        </Stack.Navigator>
    )
}

export default SettingsStack