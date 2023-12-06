import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import SitesScreen from '../Screens/Sites/SitesScreen'
import AddSiteScreen from '../Screens/Sites/AddSiteScreen'

const Stack = createStackNavigator()

const SitesStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name={'Sites Screen'} component={SitesScreen} />
            <Stack.Screen name={'Add Site Screen'} component={AddSiteScreen} />
        </Stack.Navigator>
    )
}

export default SitesStack