import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import UsersScreen from '../Screens/Users/UsersScreen'
import AddUserScreen from '../Screens/Users/AddUserScreen'

const Stack = createStackNavigator()

const UsersStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name={'Users Screen'} component={UsersScreen} />
            <Stack.Screen name={'Add User Screen'} component={AddUserScreen} />
        </Stack.Navigator>
    )
}

export default UsersStack