import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screen
import RolesScreen from '../Screens/Roles/RolesScreen'
import AddRoleScreen from '../Screens/Roles/AddRoleScreen'

const Stack = createStackNavigator()

const RolesStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name={'Roles Screen'} component={RolesScreen} />
            <Stack.Screen name={'Add Role Screen'} component={AddRoleScreen} />
        </Stack.Navigator>
    )
}

export default RolesStack