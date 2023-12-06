import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import CompanyScreen from '../Screens/Company/CompanyScreen'
import AddCompanyScreen from '../Screens/Company/AddCompanyScreen'


const Stack = createStackNavigator()

const CompanyStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name={"Company Screen"} component={CompanyScreen} />
            <Stack.Screen name={"Add Company Screen"} component={AddCompanyScreen} />
        </Stack.Navigator>
    )
}

export default CompanyStack