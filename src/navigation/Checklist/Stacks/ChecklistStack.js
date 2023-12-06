import React from 'react'

// Stack
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import ChecklistScreen from '../Screens/Checklist/ChecklistScreen'
import AddChecklistScreen from '../Screens/Checklist/AddChecklistScreen'


const Stack = createStackNavigator()

const ChecklistStack = () => {
    return (
        <Stack.Navigator  screenOptions={{
            headerShown: false,
        }} >
            <Stack.Screen name={'Checklist Screen'} component={ChecklistScreen} />
            <Stack.Screen name={'Add Checklist Screen'} component={AddChecklistScreen} />
        </Stack.Navigator>
    )
}

export default ChecklistStack